import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Leaf, Mail, Github, Linkedin, GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
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
              Meet the Team
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              The developers behind the Plant Disease Detection project for NCML
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Student Developer 1 */}
            <Card className="bg-white border-green-200 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="relative">
                <div className="absolute -top-16 inset-x-0 flex justify-center">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Student 1"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <CardHeader className="pt-20 text-center">
                <CardTitle className="text-green-800">Student Name 1</CardTitle>
                <CardDescription>Developer & ML Engineer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Computer Science student specializing in Machine Learning and Computer Vision. Responsible for CNN
                  model development and training.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href="mailto:student1@university.edu" aria-label="Email Student 1">
                      <Mail className="h-4 w-4 text-green-600" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href="#" aria-label="GitHub profile for Student 1">
                      <Github className="h-4 w-4 text-green-600" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href="#" aria-label="LinkedIn profile for Student 1">
                      <Linkedin className="h-4 w-4 text-green-600" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Student Developer 2 */}
            <Card className="bg-white border-green-200 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="relative">
                <div className="absolute -top-16 inset-x-0 flex justify-center">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Student 2"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <CardHeader className="pt-20 text-center">
                <CardTitle className="text-green-800">Student Name 2</CardTitle>
                <CardDescription>Developer & Frontend Engineer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Computer Science student with expertise in web development and UI/UX design. Responsible for the web
                  application and model integration.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href="mailto:student2@university.edu" aria-label="Email Student 2">
                      <Mail className="h-4 w-4 text-green-600" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href="#" aria-label="GitHub profile for Student 2">
                      <Github className="h-4 w-4 text-green-600" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href="#" aria-label="LinkedIn profile for Student 2">
                      <Linkedin className="h-4 w-4 text-green-600" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supervisor */}
          <Card className="bg-white border-green-200 mt-8">
            <CardHeader className="flex flex-row items-center gap-4">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-green-800">Project Supervisor</CardTitle>
                <CardDescription>Academic Advisor & Mentor</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Supervisor"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-800">Professor Name</h3>
                  <p className="text-gray-600 mt-1">Department of Computer Science</p>
                  <p className="text-gray-600 mt-4">
                    Specializing in Machine Learning and Computer Vision with a focus on agricultural applications.
                    Providing guidance and expertise for the NCML project on plant disease detection.
                  </p>
                  <div className="mt-4 flex items-center">
                    <Mail className="h-4 w-4 text-green-600 mr-2" />
                    <a href="mailto:professor@university.edu" className="text-green-600 hover:underline">
                      professor@university.edu
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white border border-green-200 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-green-800 mb-4">Project Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Course:</span> Natural Computation for Machine Learning (NCML)
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">University:</span> [Your University Name]
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Academic Year:</span> 2023-2024
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Project Title:</span> Plant Disease Detection using Convolutional Neural
                Networks
              </p>
            </div>
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
