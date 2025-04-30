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

    // Check if the response is JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      // If not JSON, get the text and throw an error
      const text = await response.text()
      throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`)
    }

    const result = await response.json()

    if (!response.ok) {
      console.error("API error:", result)
      throw new Error(result.error || `API error: ${response.status}`)
    }

    if (result.error) {
      console.warn("API warning:", result.error)
      // Don't throw here, use the mock data that should be included
    }

    // Map the API response to our expected format
    return {
      plant: result.species || "Unknown",
      status: result.condition === "healthy" ? "Healthy" : "Diseased",
      confidence: result.confidence || 0,
      species: result.species || "Unknown",
      condition: result.condition || "Unknown",
      className: result.className,
      isMock: result.isMock || false,
      error: result.error, // Pass through any error message
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
      error: error.message || "Unknown error occurred",
    }
  }
}
