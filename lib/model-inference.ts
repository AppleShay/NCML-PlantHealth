// This file contains the actual model inference code
// It's separated to avoid loading issues in the preview environment

import * as ort from "onnxruntime-node"
import sharp from "sharp"

// The model URL - use environment variable or fallback to the provided S3 URL
const MODEL_URL =
  process.env.MODEL_URL || "https://my-plant-models-12345.s3.eu-north-1.amazonaws.com/plant_disease_cnn.onnx"

export async function runInference(imageBuffer: Buffer, speciesList: string[], conditionList: string[]) {
  try {
    // Preprocess the image
    const processedImageBuffer = await preprocessImage(imageBuffer)

    // Try to load the model
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
    const feeds = { [session.inputNames[0]]: tensor }
    const results = await session.run(feeds)
    console.log("Inference completed successfully")

    // Process results
    const spLogits = results[session.outputNames[0]].data as Float32Array
    const cdLogits = results[session.outputNames[1]].data as Float32Array

    // Get the indices of the maximum values
    const spIdx = argmax(spLogits)
    const cdIdx = argmax(cdLogits)

    // Get the species and condition
    const species = speciesList[spIdx]
    const condition = conditionList[cdIdx]

    // Calculate confidence scores
    const spConfidence = Math.round(softmaxConfidence(spLogits, spIdx) * 100)
    const cdConfidence = Math.round(softmaxConfidence(cdLogits, cdIdx) * 100)
    const avgConfidence = Math.round((spConfidence + cdConfidence) / 2)

    return {
      species,
      condition,
      confidence: avgConfidence,
      speciesConfidence: spConfidence,
      conditionConfidence: cdConfidence,
      isMock: false,
    }
  } catch (error) {
    console.error("Error in model inference:", error)
    throw error
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

// Preprocess the image similar to the Python code
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
