import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Leaf, Brain, TreesIcon as Plant, Microscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
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

        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 mb-4">
              About PlantHealth
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Leveraging artificial intelligence to revolutionize plant disease detection and management
            </p>
          </div>

          <Card className="bg-white border-green-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <Plant className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-green-800">Plant Health Challenges</CardTitle>
                <CardDescription>Understanding the importance of early disease detection</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Plant diseases cause billions of dollars in crop losses annually worldwide. Early detection is crucial
                for effective management, but traditional methods often rely on expert knowledge and can be
                time-consuming.
              </p>
              <p className="text-gray-600">
                Common plant diseases like powdery mildew, leaf spot, and various blights can spread rapidly through
                crops if not identified and treated promptly. Visual symptoms on leaves are often the first indicators
                of disease, making leaf analysis an effective approach for early detection.
              </p>
              <div className="relative h-64 w-full overflow-hidden rounded-lg mt-4">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Plant disease comparison"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <Brain className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-green-800">AI in Agriculture</CardTitle>
                <CardDescription>How artificial intelligence is transforming plant disease management</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Artificial Intelligence, particularly machine learning and computer vision, has emerged as a powerful
                tool in agricultural science. These technologies enable automated, rapid, and accurate detection of
                plant diseases from images.
              </p>
              <p className="text-gray-600">
                Convolutional Neural Networks (CNNs) are particularly effective for image analysis tasks. They can
                identify patterns and features in plant leaf images that might be invisible to the human eye or require
                expert knowledge to recognize.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mt-2">
                <h3 className="font-semibold text-green-800 mb-2">Benefits of AI in Plant Disease Detection:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Early detection before symptoms are visible to the human eye</li>
                  <li>Consistent and objective analysis without human bias</li>
                  <li>Scalable to process thousands of images quickly</li>
                  <li>Accessible to farmers without specialized training</li>
                  <li>Continuous improvement as more data becomes available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <Microscope className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-green-800">Our CNN Technology</CardTitle>
                <CardDescription>How our Convolutional Neural Network works</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Our application uses a Convolutional Neural Network (CNN) trained on thousands of labeled plant leaf
                images. The model has learned to recognize visual patterns associated with various plant diseases across
                multiple species.
              </p>
              <p className="text-gray-600">
                When you upload an image, our system processes it through multiple convolutional layers that extract
                increasingly complex features. These features are then analyzed to classify the plant type and determine
                if it's healthy or affected by a specific disease.
              </p>
              <div className="relative h-48 w-full overflow-hidden rounded-lg mt-4 bg-white">
                <Image
                  src="/placeholder.svg?height=300&width=800"
                  alt="CNN architecture diagram"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-gray-600 mt-4">
                Our model achieves over 95% accuracy on test datasets and continues to improve as we expand our training
                data. The system is designed to provide not just a diagnosis but also confidence levels and
                recommendations for treatment when applicable.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Ready to try it yourself?</h2>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/upload">Upload a Plant Image</Link>
            </Button>
          </div>
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
