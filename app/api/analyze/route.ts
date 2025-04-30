import { type NextRequest, NextResponse } from "next/server"
import * as ort from "onnxruntime-node"
import sharp from "sharp"
import fs from "fs"
import path from "path"

// The model URL - use environment variable or fallback to the provided S3 URL
const MODEL_URL =
  process.env.MODEL_URL || "https://my-plant-models-12345.s3.eu-north-1.amazonaws.com/plant_disease_resnet18.onnx"

export async function POST(request: NextRequest) {
  try {
    // Get the image data from the request
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Read the image buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Load classes from the JSON file
    let classes: string[] = []
    try {
      // Try to load from public directory first
      const classesPath = path.join(process.cwd(), "public", "classes.json")
      if (fs.existsSync(classesPath)) {
        const classesData = fs.readFileSync(classesPath, "utf-8")
        classes = JSON.parse(classesData)
        console.log(`Loaded ${classes.length} classes from classes.json`)
      } else {
        // Fallback to hardcoded classes
        classes = [
          "Apple___Apple_scab",
          "Apple___Black_rot",
          "Apple___Cedar_apple_rust",
          "Apple___healthy",
          "Blueberry___healthy",
          "Cherry_(including_sour)___Powdery_mildew",
          "Cherry_(including_sour)___healthy",
          "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
          "Corn_(maize)___Common_rust_",
          "Corn_(maize)___Northern_Leaf_Blight",
          "Corn_(maize)___healthy",
          "Grape___Black_rot",
          "Grape___Esca_(Black_Measles)",
          "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
          "Grape___healthy",
          "Orange___Haunglongbing_(Citrus_greening)",
          "Peach___Bacterial_spot",
          "Peach___healthy",
          "Pepper,_bell___Bacterial_spot",
          "Pepper,_bell___healthy",
          "Potato___Early_blight",
          "Potato___Late_blight",
          "Potato___healthy",
          "Raspberry___healthy",
          "Soybean___healthy",
          "Squash___Powdery_mildew",
          "Strawberry___Leaf_scorch",
          "Strawberry___healthy",
          "Tomato___Bacterial_spot",
          "Tomato___Early_blight",
          "Tomato___Late_blight",
          "Tomato___Leaf_Mold",
          "Tomato___Septoria_leaf_spot",
          "Tomato___Spider_mites Two-spotted_spider_mite",
          "Tomato___Target_Spot",
          "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
          "Tomato___Tomato_mosaic_virus",
          "Tomato___healthy",
        ]
        console.log("Using hardcoded classes as fallback")
      }
    } catch (classesError) {
      console.error("Error loading classes:", classesError)
      return NextResponse.json({ error: "Failed to load classes" }, { status: 500 })
    }

    try {
      // Always try to use the model, even in development
      // This ensures consistent results matching the Python implementation

      // Preprocess the image exactly like the Python code
      const processedImageBuffer = await preprocessImage(buffer)

      try {
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
        // Make sure we use the same input name as your model expects
        const tensor = new ort.Tensor("float32", processedImageBuffer, [1, 3, 224, 224])
        const feeds = { input: tensor }
        const results = await session.run(feeds)
        console.log("Inference completed successfully")

        // Get the output tensor (assuming it's named 'output')
        const outputTensor = results[session.outputNames[0]]
        const output = outputTensor.data as Float32Array

        // Process results exactly like the Python code
        const idx = argmax(output)

        if (idx >= classes.length) {
          throw new Error(`Invalid class index: ${idx}, max index should be ${classes.length - 1}`)
        }

        const className = classes[idx]
        const [species, condition] = className.split("___")

        // Calculate confidence using softmax
        const confidence = Math.round(softmaxConfidence(output, idx) * 100)

        return NextResponse.json({
          species: species.replace("_(including_sour)", "").replace("_(maize)", "").replace(",_bell", ""),
          condition: condition.replace("_", " "),
          confidence,
          className,
          isMock: false,
        })
      } catch (modelError) {
        console.error("Error with model inference:", modelError)
        // Only use mock data if there's an actual error with the model
        return NextResponse.json({
          error: `Model inference error: ${modelError.message}`,
          ...mockResponse(classes),
        })
      }
    } catch (processingError) {
      console.error("Error processing image:", processingError)
      return NextResponse.json({
        error: `Image processing error: ${processingError.message}`,
        ...mockResponse(classes),
      })
    }
  } catch (error) {
    console.error("Error handling request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

// Helper function to find the index of the maximum value in an array
// This matches the Python argmax function
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

// Preprocess the image exactly like the Python code
async function preprocessImage(buffer: Buffer): Promise<Float32Array> {
  // Resize to 224x224 like in the Python code
  const resizedImage = await sharp(buffer).resize(224, 224).raw().toBuffer()

  // Convert to RGB float32 array and normalize with the same values as Python
  const rgbData = new Float32Array(3 * 224 * 224)
  const means = [0.485, 0.456, 0.406] // Same as Python
  const stds = [0.229, 0.224, 0.225] // Same as Python

  // Process in CHW format like PyTorch (channels first)
  for (let c = 0; c < 3; c++) {
    for (let h = 0; h < 224; h++) {
      for (let w = 0; w < 224; w++) {
        // Get the pixel value from HWC format (height, width, channel)
        const pixelValue = resizedImage[(h * 224 + w) * 3 + c] / 255.0

        // Normalize and store in CHW format
        const idx = c * 224 * 224 + h * 224 + w
        rgbData[idx] = (pixelValue - means[c]) / stds[c]
      }
    }
  }

  return rgbData
}

// Return a mock response only when absolutely necessary
function mockResponse(classes: string[]) {
  const randomIndex = Math.floor(Math.random() * classes.length)
  const className = classes[randomIndex]
  const [species, condition] = className.split("___")

  return {
    species: species.replace("_(including_sour)", "").replace("_(maize)", "").replace(",_bell", ""),
    condition: condition.replace("_", " "),
    confidence: Math.floor(85 + Math.random() * 15),
    className,
    isMock: true,
  }
}
