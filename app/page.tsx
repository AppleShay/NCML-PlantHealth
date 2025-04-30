import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Plant Disease Detection
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Upload an image of a plant leaf and our AI will analyze it to determine if it's healthy or diseased.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/upload">
                    Upload Image <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 items-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-800">Fast Analysis</h2>
                <p className="text-gray-600">Get instant results about the health of your plants.</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-800">Accurate Detection</h2>
                <p className="text-gray-600">
                  Our CNN model is trained on thousands of plant images for high accuracy.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-800">Plant Identification</h2>
                <p className="text-gray-600">Identify plant species along with their health status.</p>
              </div>
            </div>
          </div>
        </section>
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
