"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Leaf, Upload, AlertCircle, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { analyzeImage } from "@/lib/analyze-image"

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    status: string
    plant: string
    confidence: number
    species?: string
    condition?: string
    className?: string
    isMock?: boolean
    error?: string
  } | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setSelectedImage(event.target.result as string)
          setResult(null)
          setError(null)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Update the handleAnalyze function to better handle errors
  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const analysisResult = await analyzeImage(selectedImage)

      if (analysisResult.error) {
        setError(analysisResult.error)
        // Still set the result if we have mock data
        if (analysisResult.species !== "Unknown") {
          setResult(analysisResult)
        }
      } else {
        setResult(analysisResult)
      }
    } catch (error) {
      console.error("Error analyzing image:", error)
      setError(error instanceof Error ? error.message : "Failed to analyze the image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold text-green-800">PlantHealth</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-green-800" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-green-800" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" className="text-green-800" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Upload Plant Image</CardTitle>
              <CardDescription>Select an image of a plant leaf for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-full h-64 border-2 border-dashed border-green-300 rounded-lg flex items-center justify-center bg-green-50 relative overflow-hidden">
                  {selectedImage ? (
                    <Image
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected plant"
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="mx-auto h-12 w-12 text-green-400" />
                      <p className="mt-2 text-sm text-gray-500">Click to select or drag and drop</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                {fileName && <p className="text-sm text-gray-500">{fileName}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Analysis Result</CardTitle>
              <CardDescription>The AI model's assessment of your plant</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  {error && (
                    <Alert className="mb-4 bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">Warning: {error}</AlertDescription>
                    </Alert>
                  )}

                  {result.isMock && (
                    <Alert className="mb-4 bg-amber-50 border-amber-200">
                      <Info className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        Note: This is a demonstration result. For actual predictions, deploy the application with your
                        model.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div
                    className={`text-center p-4 rounded-lg ${
                      result.status === "Healthy" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{result.plant}</h3>
                    <p
                      className={`text-xl font-semibold ${
                        result.status === "Healthy" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {result.status}
                    </p>

                    {result.condition && result.condition !== "healthy" && (
                      <p className="text-gray-700 mt-1">Condition: {result.condition}</p>
                    )}

                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-gray-600">Confidence: {result.confidence}%</p>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded text-left">
                      <p className="text-xs font-mono text-gray-500">
                        {JSON.stringify(
                          {
                            species: result.species || result.plant,
                            condition: result.condition || result.status,
                            isMock: result.isMock,
                          },
                          null,
                          2,
                        )}
                      </p>
                    </div>
                  </div>

                  {result.status === "Diseased" && (
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-800">Recommendations:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                        <li>Isolate the affected plant to prevent spread</li>
                        <li>Remove and dispose of severely affected leaves</li>
                        <li>Consider appropriate fungicide or treatment</li>
                        <li>Ensure proper air circulation around plants</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <p>Upload and analyze an image to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-green-200">
        <p className="text-xs text-green-800">© 2024 PlantHealth. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-green-800" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-green-800" href="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
