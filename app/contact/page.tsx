import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Github,
  MessageCircle,
  Clock,
} from "lucide-react"

const siteUrl = "https://pomobox.app"

export const metadata: Metadata = {
  title: "Contact Pomobox Support: Email & GitHub | Pomobox",
  description: "Contact the Pomobox team for support, feedback & feature requests. Email us at pomoboxapp@gmail.com or open GitHub issues. We typically respond within 1-2 business days.",
  keywords: ["pomobox contact", "pomobox support", "report bug", "feature request"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/contact`,
    siteName: "Pomobox",
    title: "Contact Pomobox Support",
    description: "Get in touch for support, feedback, or feature requests. Email or GitHub. Response within 1-2 business days.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Pomobox",
    description: "Pomobox support: email pomoboxapp@gmail.com or GitHub. 1-2 day response.",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
}

function ContactCard({
  icon: Icon,
  title,
  description,
  href,
  linkText,
  external = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  linkText: string
  external?: boolean
}) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}

  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <a
        href={href}
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline transition-colors text-sm font-medium"
        {...linkProps}
      >
        {linkText}
        {external && <span className="text-xs">↗</span>}
      </a>
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pomobox
        </Link>

        {/* Main Content Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Contact Us</h1>
            <p className="text-muted-foreground">We'd love to hear from you</p>
          </div>

          {/* Contact Options */}
          <div className="space-y-4">
            <ContactCard
              icon={Mail}
              title="Email"
              description="For general inquiries, feedback, or support requests"
              href="mailto:pomoboxapp@gmail.com"
              linkText="pomoboxapp@gmail.com"
            />

            <ContactCard
              icon={Github}
              title="GitHub"
              description="Report bugs, request features, or contribute to the project"
              href="https://github.com/Seongyul-Lee/pomobox"
              linkText="View on GitHub"
              external
            />
          </div>

          {/* Response Time Notice */}
          <div className="mt-8 p-4 rounded-lg bg-muted/30 flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              We typically respond within 1-2 business days. For urgent issues, please include 'URGENT' in your email subject.
            </p>
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
    </main>
  )
}
