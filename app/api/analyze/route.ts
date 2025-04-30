import { type NextRequest, NextResponse } from "next/server"
import * as ort from "onnxruntime-node"
import sharp from "sharp"
import fs from "fs"
import path from "path"

// The model URL from environment variable
const MODEL_URL = process.env.MODEL_URL

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
      // Try to load from public directory
      const classesPath = path.join(process.cwd(), "public", "classes.json")
      if (fs.existsSync(classesPath)) {
        const classesData = fs.readFileSync(classesPath, "utf-8")
        classes = JSON.parse(classesData)
        console.log(`Loaded ${classes.length} classes from classes.json`)
      } else {
        return NextResponse.json({ error: "classes.json not found" }, { status: 500 })
      }
    } catch (classesError) {
      console.error("Error loading classes:", classesError)
      return NextResponse.json({ error: "Failed to load classes" }, { status: 500 })
    }

    try {
      // Fetch the model
      if (!MODEL_URL) {
        return NextResponse.json({ error: "MODEL_URL environment variable not set" }, { status: 500 })
      }

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

      // Process the image exactly like the Python code
      // 1. Resize to 224x224
      const resizedImageBuffer = await sharp(buffer).resize(224, 224).raw().toBuffer()

      // 2. Convert to RGB float32 array in CHW format (channels first)
      const rgbData = new Float32Array(3 * 224 * 224)
      const means = [0.485, 0.456, 0.406] // Same as Python
      const stds = [0.229, 0.224, 0.225] // Same as Python

      // Process in CHW format like PyTorch (channels first)
      for (let c = 0; c < 3; c++) {
        for (let h = 0; h < 224; h++) {
          for (let w = 0; w < 224; w++) {
            // Get the pixel value from HWC format (height, width, channel)
            const pixelValue = resizedImageBuffer[(h * 224 + w) * 3 + c] / 255.0

            // Normalize and store in CHW format
            const idx = c * 224 * 224 + h * 224 + w
            rgbData[idx] = (pixelValue - means[c]) / stds[c]
          }
        }
      }

      // 3. Create tensor and run inference
      console.log("Running inference...")
      const tensor = new ort.Tensor("float32", rgbData, [1, 3, 224, 224])

      // Use the correct input name for your model
      const feeds = { input: tensor }
      const results = await session.run(feeds)
      console.log("Inference completed successfully")

      // 4. Process results exactly like the Python code
      const outputTensor = results[session.outputNames[0]]
      const output = outputTensor.data as Float32Array

      // Get the argmax (index of highest value)
      const idx = Array.from(output).reduce((maxIdx, val, idx, arr) => (val > arr[maxIdx] ? idx : maxIdx), 0)

      if (idx >= classes.length) {
        throw new Error(`Invalid class index: ${idx}, max index should be ${classes.length - 1}`)
      }

      // Get the class name and split into species and condition
      const className = classes[idx]
      const [species, condition] = className.split("___")

      // Return the result
      return NextResponse.json({
        species,
        condition,
        className,
        confidence: Math.round(100 * output[idx]),
        isMock: false,
      })
    } catch (error) {
      console.error("Error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  } catch (error) {
    console.error("Error handling request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
