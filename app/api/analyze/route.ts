import { type NextRequest, NextResponse } from "next/server"
import * as ort from "onnxruntime-node"
import sharp from "sharp"

// Load classes from the model
// In production, you would load this from a file or environment variable
const classes = [
  "Apple___Apple_scab",
  "Apple___Black_rot",
  "Apple___Cedar_apple_rust",
  "Apple___healthy",
  "Blueberry___healthy",
  "Cherry___healthy",
  "Cherry___Powdery_mildew",
  "Corn___Cercospora_leaf_spot Gray_leaf_spot",
  "Corn___Common_rust",
  "Corn___healthy",
  "Corn___Northern_Leaf_Blight",
  "Grape___Black_rot",
  "Grape___Esca_(Black_Measles)",
  "Grape___healthy",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
  "Orange___Haunglongbing_(Citrus_greening)",
  "Peach___Bacterial_spot",
  "Peach___healthy",
  "Pepper,_bell___Bacterial_spot",
  "Pepper,_bell___healthy",
  "Potato___Early_blight",
  "Potato___healthy",
  "Potato___Late_blight",
  "Raspberry___healthy",
  "Soybean___healthy",
  "Squash___Powdery_mildew",
  "Strawberry___healthy",
  "Strawberry___Leaf_scorch",
  "Tomato___Bacterial_spot",
  "Tomato___Early_blight",
  "Tomato___healthy",
  "Tomato___Late_blight",
  "Tomato___Leaf_Mold",
  "Tomato___Septoria_leaf_spot",
  "Tomato___Spider_mites Two-spotted_spider_mite",
  "Tomato___Target_Spot",
  "Tomato___Tomato_mosaic_virus",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
]

// The model URL - use environment variable or fallback to the provided S3 URL
const MODEL_URL =
  process.env.MODEL_URL || "https://my-plant-models-12345.s3.eu-north-1.amazonaws.com/plant_disease_resnet18.onnx"

// Wrap the entire function body in a try-catch to ensure we always return valid JSON
export async function POST(request: NextRequest) {
  try {
    // Get the image data from the request
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    try {
      // Read the image buffer
      const buffer = Buffer.from(await file.arrayBuffer())

      // Check if we're in a production environment
      if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
        try {
          // Preprocess the image
          const processedImageBuffer = await preprocessImage(buffer)

          // Fetch the model
          console.log("Fetching model from URL:", MODEL_URL)
          const modelResponse = await fetch(MODEL_URL)

          if (!modelResponse.ok) {
            throw new Error(`Failed to fetch model: ${modelResponse.status} ${modelResponse.statusText}`)
          }

          const modelBuffer = new Uint8Array(await modelResponse.arrayBuffer())
          console.log("Model fetched successfully")

          // Create a session
          console.log("Creating ONNX session...")
          const session = await ort.InferenceSession.create(modelBuffer)
          console.log("ONNX session created successfully")

          // Run inference
          console.log("Running inference...")
          const tensor = new ort.Tensor("float32", processedImageBuffer, [1, 3, 224, 224])
          const feeds = { input: tensor }
          const results = await session.run(feeds)
          console.log("Inference completed successfully")

          // Process results
          const output = results.output.data as Float32Array
          const idx = argmax(output)
          const className = classes[idx]

          // Split the class name into species and condition
          const [species, condition] = className.split("___")

          // Calculate confidence using softmax
          const confidence = Math.round(softmaxConfidence(output, idx) * 100)

          return NextResponse.json({
            species: species.replace(",_", " "),
            condition: condition.replace("_", " "),
            confidence,
            className,
            isMock: false,
          })
        } catch (modelError) {
          console.error("Error with model inference:", modelError)
          return NextResponse.json({
            error: `Model inference error: ${modelError.message}`,
            isMock: true,
            ...mockResponse().json(),
          })
        }
      } else {
        // In development/preview, return mock data
        return mockResponse()
      }
    } catch (processingError) {
      console.error("Error processing image:", processingError)
      return NextResponse.json({
        error: `Image processing error: ${processingError.message}`,
        isMock: true,
        ...mockResponse().json(),
      })
    }
  } catch (error) {
    console.error("Error handling request:", error)
    // Always return a valid JSON response, even for server errors
    return NextResponse.json(
      {
        error: `Server error: ${error.message || "Unknown error"}`,
        isMock: true,
        species: "Error",
        condition: "Error",
        confidence: 0,
      },
      { status: 500 },
    )
  }
}

// Helper function to find the index of the maximum value in an array
function argmax(array: Float32Array): number {
  return array.reduce((maxIndex, value, index, arr) => (value > arr[maxIndex] ? index : maxIndex), 0)
}

// Calculate confidence using softmax
function softmaxConfidence(logits: Float32Array, maxIndex: number): number {
  // Apply softmax to get probabilities
  const maxLogit = Math.max(...Array.from(logits))
  const expLogits = Array.from(logits).map((l) => Math.exp(l - maxLogit))
  const sumExp = expLogits.reduce((a, b) => a + b, 0)
  const probs = expLogits.map((exp) => exp / sumExp)

  // Return the probability of the predicted class
  return probs[maxIndex]
}

// Preprocess the image similar to the PyTorch code
async function preprocessImage(buffer: Buffer): Promise<Float32Array> {
  // Resize to 224x224
  const resizedImage = await sharp(buffer).resize(224, 224).raw().toBuffer()

  // Convert to RGB float32 array and normalize
  const rgbData = new Float32Array(3 * 224 * 224)
  const means = [0.485, 0.456, 0.406]
  const stds = [0.229, 0.224, 0.225]

  for (let i = 0; i < 224 * 224; i++) {
    for (let c = 0; c < 3; c++) {
      // Convert to [0,1] and normalize
      const pixelValue = resizedImage[i * 3 + c] / 255.0
      rgbData[c * 224 * 224 + i] = (pixelValue - means[c]) / stds[c]
    }
  }

  return rgbData
}

// Update the mockResponse function to return a NextResponse object directly
function mockResponse() {
  const randomIndex = Math.floor(Math.random() * classes.length)
  const className = classes[randomIndex]
  const [species, condition] = className.split("___")

  return NextResponse.json({
    species: species.replace(",_", " ").replace(/_/g, " "),
    condition: condition.replace("_", " ").replace(/_/g, " "),
    confidence: Math.floor(85 + Math.random() * 15),
    className,
    isMock: true,
  })
}
