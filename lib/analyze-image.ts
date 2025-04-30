export async function analyzeImage(imageData: string): Promise<{
  status: string
  plant: string
  confidence: number
  species: string
  condition: string
  className?: string
  isMock?: boolean
  error?: string
}> {
  try {
    // Convert base64 to blob
    const base64Response = await fetch(imageData)
    const blob = await base64Response.blob()

    // Create form data
    const formData = new FormData()
    formData.append("image", blob)

    // Send to API
    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("API error:", result)
      throw new Error(result.error || `API error: ${response.status}`)
    }

    if (result.error) {
      throw new Error(result.error)
    }

    // Map the API response to our expected format
    return {
      plant: result.species,
      status: result.condition === "healthy" ? "Healthy" : "Diseased",
      confidence: result.confidence,
      species: result.species,
      condition: result.condition,
      className: result.className,
      isMock: result.isMock || false,
    }
  } catch (error) {
    console.error("Error analyzing image:", error)

    // Return error information along with fallback data
    return {
      plant: "Unknown",
      status: "Unknown",
      confidence: 0,
      species: "Unknown",
      condition: "Unknown",
      isMock: true,
      error: error.message,
    }
  }
}
