import { NextResponse } from "next/server"
import * as ort from "onnxruntime-node"

// Hardcode the model URL as provided
const MODEL_URL = "https://my-plant-models-12345.s3.eu-north-1.amazonaws.com/plant_disease_resnet18.onnx"

export async function GET() {
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

    // Return the input and output names
    return NextResponse.json({
      inputNames: session.inputNames,
      outputNames: session.outputNames,
      success: true,
    })
  } catch (error) {
    console.error("Error debugging model:", error)
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 500 },
    )
  }
}
