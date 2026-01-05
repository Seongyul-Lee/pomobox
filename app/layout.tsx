import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { AdSenseScript } from "@/components/adsense-script"
import { Sidebar } from "@/components/sidebar"
import { TaskPanel } from "@/components/task-panel"
import { Providers } from "./providers"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
})

const siteUrl = "https://pomobox.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pomobox - Minimal Pomodoro Timer for Focused Work",
    template: "%s | Pomobox",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", sizes: "192x192", type: "image/png" }],
  },
  description: "A clean, distraction-free Pomodoro timer to boost your productivity. Track focus sessions, take smart breaks, and stay in flow.",
  keywords: [
    "pomodoro",
    "timer",
    "productivity",
    "focus",
    "study",
    "work",
    "time management",
    "pomodoro technique",
  ],
  authors: [{ name: "Pomobox" }],
  creator: "Pomobox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Pomobox",
    title: "Pomobox - Minimal Pomodoro Timer for Focused Work",
    description: "A clean, distraction-free Pomodoro timer to boost your productivity. Track focus sessions, take smart breaks, and stay in flow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomobox - Minimal Pomodoro Timer for Focused Work",
    description: "A clean, distraction-free Pomodoro timer to boost your productivity. Track focus sessions, take smart breaks, and stay in flow.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    other: {
      "naver-site-verification": "e09d920f92485cdb757332999b0dcb5089701a75",
      "google-adsense-account": "ca-pub-7020101743498097",
    },
  },
}

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pomobox",
  description:
    "A clean, distraction-free Pomodoro timer to boost your productivity. Track focus sessions, take smart breaks, and stay in flow.",
  url: siteUrl,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Pomodoro Timer",
    "Focus Sessions",
    "Break Management",
    "Session Statistics",
    "Customizable Durations",
    "Sound Notifications",
    "Dark Mode",
  ],
}

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pomobox",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: "Pomobox creates minimal, distraction-free productivity tools. Our flagship product is a Pomodoro timer designed for focused work.",
  sameAs: [
    "https://github.com/pomobox",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "help.pomobox@gmail.com",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
}

const jsonLdSiteNavigation = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: "Main Navigation",
  hasPart: [
    {
      "@type": "SiteNavigationElement",
      name: "Timer",
      url: siteUrl,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Statistics",
      url: `${siteUrl}/stats`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Guides",
      url: `${siteUrl}/guide/what-is-pomodoro`,
      hasPart: [
        { "@type": "SiteNavigationElement", name: "What is Pomodoro?", url: `${siteUrl}/guide/what-is-pomodoro` },
        { "@type": "SiteNavigationElement", name: "For Students", url: `${siteUrl}/guide/pomodoro-for-students` },
        { "@type": "SiteNavigationElement", name: "For Developers", url: `${siteUrl}/guide/pomodoro-for-developers` },
        { "@type": "SiteNavigationElement", name: "Pomodoro vs Timeboxing", url: `${siteUrl}/guide/pomodoro-vs-timeboxing` },
        { "@type": "SiteNavigationElement", name: "Avoid Distractions", url: `${siteUrl}/guide/how-to-avoid-distractions` },
      ],
    },
    {
      "@type": "SiteNavigationElement",
      name: "Blog",
      url: `${siteUrl}/blog/pomodoro-history`,
      hasPart: [
        { "@type": "SiteNavigationElement", name: "Pomodoro History", url: `${siteUrl}/blog/pomodoro-history` },
        { "@type": "SiteNavigationElement", name: "Science of Focus", url: `${siteUrl}/blog/science-of-focus` },
      ],
    },
    {
      "@type": "SiteNavigationElement",
      name: "About",
      url: `${siteUrl}/about`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "FAQ",
      url: `${siteUrl}/faq`,
    },
  ],
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSiteNavigation) }}
        />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        <AdSenseScript />
        <Providers>
          {/* Global Sidebar (md+) */}
          <Sidebar />
          {/* Global Task Panel */}
          <TaskPanel />
          {children}
          <Analytics />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
