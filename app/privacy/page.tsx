import Link from "next/link"
import { ArrowLeft, Leaf, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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

        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">Privacy Policy</h1>
          </div>

          <div className="prose max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-6">Last updated: April 28, 2024</p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">1. Introduction</h2>
            <p>
              At PlantHealth, we respect your privacy and are committed to protecting your personal data. This Privacy
              Policy explains how we collect, use, and safeguard your information when you use our plant disease
              detection service.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">2. Data We Collect</h2>
            <p>When you use our service, we may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Images:</strong> Plant images that you upload for analysis.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser
                plug-in types and versions, operating system and platform, and other technology on the devices you use
                to access our website.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website and services.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">3. How We Use Your Data</h2>
            <p>We use your data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>To provide and maintain our service, including analyzing plant images for disease detection.</li>
              <li>To improve our machine learning models and enhance the accuracy of our disease detection.</li>
              <li>To respond to your requests or inquiries.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">4. Dataset Information</h2>
            <p>Our plant disease detection model has been trained using datasets from Kaggle, specifically:</p>
            <div className="bg-green-50 p-4 rounded-lg mt-2">
              <h3 className="font-semibold text-green-700 mb-2">Kaggle Dataset Attribution</h3>
              <p>
                The machine learning model used in this application was trained on the "Plant Village Dataset" from
                Kaggle, which contains thousands of images of healthy and diseased plant leaves across various species.
                This dataset is publicly available for research and educational purposes.
              </p>
              <p className="mt-2">
                <a
                  href="https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  View the dataset on Kaggle
                </a>
              </p>
            </div>
            <p className="mt-4">
              We acknowledge and thank the creators and contributors of this dataset for making it available to the
              research community. The use of this dataset is in accordance with Kaggle's terms of service and the
              dataset's specific license.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">5. GDPR Compliance</h2>
            <p>In compliance with the EU General Data Protection Regulation (GDPR), we ensure that:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>We process your data lawfully, fairly, and transparently.</li>
              <li>We collect data for specified, explicit, and legitimate purposes.</li>
              <li>We limit our data collection to what is necessary for the purposes for which it is processed.</li>
              <li>We ensure that the data we keep is accurate and up to date.</li>
              <li>We keep data only for as long as necessary for the purposes for which it is processed.</li>
              <li>We process data in a manner that ensures appropriate security.</li>
            </ul>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">6. Your Data Rights</h2>
            <p>Under the GDPR, you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The right to access your personal data.</li>
              <li>The right to rectify inaccurate personal data.</li>
              <li>The right to erasure (the 'right to be forgotten').</li>
              <li>The right to restrict processing of your personal data.</li>
              <li>The right to data portability.</li>
              <li>The right to object to processing of your personal data.</li>
              <li>Rights related to automated decision-making and profiling.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us using the information provided in the "Contact Us"
              section.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">7. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational measures to protect your personal data from
              accidental loss, unauthorized access, alteration, or disclosure. However, no method of transmission over
              the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">8. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. Cookies are small text files that are placed
              on your device when you visit our website. They allow us to recognize your device and remember certain
              information about your visit.
            </p>
            <p className="mt-2">
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or
              access cookies. If you disable or refuse cookies, please note that some parts of our website may become
              inaccessible or not function properly.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
            <p className="mt-2">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p className="mt-2">
              <a href="mailto:sherotowshaw@gmail.com" className="text-green-600 hover:underline">
                sherotowshaw@gmail.com
              </a>
            </p>
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
