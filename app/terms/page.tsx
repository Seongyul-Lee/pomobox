import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  User,
  AlertTriangle,
  Shield,
  Scale,
  RefreshCw,
  XCircle,
  Globe,
  Mail,
} from "lucide-react"
import { Breadcrumb, BREADCRUMB_PRESETS } from "@/components/ui/breadcrumb"

const siteUrl = "https://pomobox.app"

export const metadata: Metadata = {
  title: "Terms of Service: Fair Use Policy | Pomobox",
  description: "Pomobox Terms of Service: Free forever, no premium tiers. Understand usage rights, acceptable conduct, and your data ownership. Open-source app with transparent rules.",
  keywords: ["pomobox terms", "terms of service", "user agreement", "fair use policy"],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: `${siteUrl}/terms`,
    siteName: "Pomobox",
    title: "Pomobox Terms of Service: Fair Use & User Agreement",
    description: "Free forever, open-source Pomodoro timer. Understand your rights and our transparent usage policy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Pomobox",
    description: "Pomobox terms: free forever, open-source, transparent usage policy.",
  },
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
}

function SectionTitle({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mt-10 mb-4 group">
      <span className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      {children}
    </h2>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

// JSON-LD Schema for Terms page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description: "Pomobox Terms of Service: Free forever, no premium tiers. Understand usage rights, acceptable conduct, and your data ownership.",
  url: `${siteUrl}/terms`,
  dateModified: "2026-01-22",
  publisher: {
    "@type": "Organization",
    name: "Pomobox",
    url: siteUrl,
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <Breadcrumb
          items={BREADCRUMB_PRESETS.legal("Terms")}
          className="mb-8"
        />

        {/* Main Content Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 22, 2026</p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            {/* 1. Acceptance */}
            <SectionTitle icon={CheckCircle}>1. Acceptance of Terms</SectionTitle>
            <Paragraph>By accessing or using Pomobox, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</Paragraph>

            {/* 2. Service Description */}
            <SectionTitle icon={FileText}>2. Service Description</SectionTitle>
            <Paragraph>Pomobox is a productivity tool that provides:</Paragraph>
            <List items={[
              "Pomodoro timer for focused work sessions",
              "Focus session tracking and statistics",
              "Background music for concentration",
              "Cross-device data synchronization (for registered users)"
            ]} />

            {/* 3. User Accounts */}
            <SectionTitle icon={User}>3. User Accounts</SectionTitle>
            <Paragraph>When you create an account, you agree to:</Paragraph>
            <List items={[
              "Provide accurate and complete information",
              "Maintain the security of your password",
              "Accept responsibility for all activities under your account",
              "Notify us immediately of any unauthorized use"
            ]} />

            {/* 4. Acceptable Use */}
            <SectionTitle icon={AlertTriangle}>4. Acceptable Use</SectionTitle>
            <Paragraph>You agree not to:</Paragraph>
            <List items={[
              "Use the service for any illegal purpose",
              "Attempt to gain unauthorized access to any part of the service",
              "Interfere with or disrupt the service",
              "Copy, modify, or distribute our content without permission",
              "Use automated systems to access the service without our consent"
            ]} />

            {/* 5. Intellectual Property */}
            <SectionTitle icon={Shield}>5. Intellectual Property</SectionTitle>
            <Paragraph>All content, features, and functionality of Pomobox, including but not limited to text, graphics, logos, and software, are owned by Pomobox and are protected by international copyright, trademark, and other intellectual property laws.</Paragraph>

            {/* 6. Disclaimer */}
            <SectionTitle icon={AlertTriangle}>6. Disclaimer of Warranties</SectionTitle>
            <Paragraph>Pomobox is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.</Paragraph>

            {/* 7. Limitation of Liability */}
            <SectionTitle icon={Scale}>7. Limitation of Liability</SectionTitle>
            <Paragraph>To the maximum extent permitted by law, Pomobox shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from your use of the service.</Paragraph>

            {/* 8. Changes to Terms */}
            <SectionTitle icon={RefreshCw}>8. Changes to Terms</SectionTitle>
            <Paragraph>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date.</Paragraph>

            {/* 9. Termination */}
            <SectionTitle icon={XCircle}>9. Termination</SectionTitle>
            <Paragraph>We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.</Paragraph>

            {/* 10. Governing Law */}
            <SectionTitle icon={Globe}>10. Governing Law</SectionTitle>
            <Paragraph>These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</Paragraph>

            {/* 11. Contact */}
            <SectionTitle icon={Mail}>11. Contact Us</SectionTitle>
            <Paragraph>
              If you have any questions about these Terms of Service, please contact us at:{" "}
              <a href="mailto:pomoboxapp@gmail.com" className="text-primary hover:underline">
                pomoboxapp@gmail.com
              </a>
            </Paragraph>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Pomobox
            </Link>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema - static constant data, XSS-safe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
