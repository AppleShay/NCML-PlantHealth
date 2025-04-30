import Link from "next/link"
import { ArrowLeft, Leaf, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function TermsPage() {
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
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">Terms of Service</h1>
          </div>

          <div className="prose max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-6">Last updated: April 28, 2024</p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to PlantHealth. These Terms of Service govern your use of our website and the plant disease
              detection services we provide. By using our service, you agree to these terms in their entirety.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">2. GDPR Compliance</h2>
            <p>
              In accordance with the European Union's General Data Protection Regulation (GDPR), we are committed to
              protecting the personal data of our users. As a user of our service, you have the following rights:
            </p>

            <h3 className="text-lg font-medium text-green-700 mt-6 mb-3">2.1 Right to Access</h3>
            <p>
              You have the right to request a copy of the personal data we hold about you, as well as information about
              how we process it.
            </p>

            <h3 className="text-lg font-medium text-green-700 mt-6 mb-3">2.2 Right to Rectification</h3>
            <p>
              You have the right to request that we correct any inaccurate personal data we hold about you, or complete
              any incomplete personal data.
            </p>

            <h3 className="text-lg font-medium text-green-700 mt-6 mb-3">2.3 Right to Erasure</h3>
            <p>
              Also known as the 'right to be forgotten', you have the right to request that we delete your personal data
              in certain circumstances, such as when the data is no longer necessary for the purposes for which it was
              collected.
            </p>

            <h3 className="text-lg font-medium text-green-700 mt-6 mb-3">2.4 Right to Restrict Processing</h3>
            <p>
              You have the right to request that we restrict the processing of your personal data in certain
              circumstances, such as when you contest the accuracy of the data.
            </p>

            <h3 className="text-lg font-medium text-green-700 mt-6 mb-3">2.5 Right to Data Portability</h3>
            <p>
              You have the right to request that we provide you with your personal data in a structured, commonly used,
              and machine-readable format, and to transmit this data to another controller.
            </p>

            <h3 className="text-lg font-medium text-green-700 mt-6 mb-3">2.6 Right to Object</h3>
            <p>
              You have the right to object to the processing of your personal data in certain circumstances, such as
              when the processing is based on our legitimate interests.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">3. Data Processing</h2>
            <p>We process your data based on the following legal grounds:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Consent:</strong> When you upload an image for analysis, you consent to our processing of that
                image for the purpose of plant disease detection.
              </li>
              <li>
                <strong>Legitimate Interest:</strong> We may process certain data based on our legitimate interest to
                improve our service and machine learning models.
              </li>
              <li>
                <strong>Legal Obligation:</strong> We may process your data to comply with legal obligations to which we
                are subject.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">4. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was
              collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            <p className="mt-2">
              Uploaded plant images may be retained for a period of 30 days to allow for analysis and potential
              reanalysis. After this period, the images will be automatically deleted from our active systems.
            </p>
            <p className="mt-2">
              With your explicit consent, we may retain anonymized versions of plant images for the purpose of improving
              our machine learning models. These anonymized images will not contain any personal identifiers.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">5. Service Usage</h2>
            <p>
              Our plant disease detection service is provided for educational and informational purposes only. While we
              strive for accuracy, we cannot guarantee that all disease detections will be correct. Users should consult
              with agricultural experts for confirmation of plant diseases and treatment recommendations.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, and software, is
              the property of PlantHealth or its content suppliers and is protected by international copyright laws.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">7. Changes to Terms</h2>
            <p>
              We may revise these Terms of Service from time to time. The most current version will always be posted on
              our website. By continuing to use our service after any changes, you accept the revised terms.
            </p>

            <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service or our data processing practices, please contact us
              at:
            </p>
            <p className="mt-2">
              <a href="mailto:contact@planthealth.example.com" className="text-green-600 hover:underline">
                contact@planthealth.example.com
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
