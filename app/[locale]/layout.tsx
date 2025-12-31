import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { AdSenseScript } from "@/components/adsense-script"
import { Providers } from "../providers"
import { routing } from "@/i18n/routing"
import "../globals.css"

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

const localeToOgLocale: Record<string, string> = {
  en: "en_US",
  ko: "ko_KR",
  ja: "ja_JP",
  "zh-CN": "zh_CN",
}

type MetadataProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })

  const title = t("title")
  const description = t("description")

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | Pomobox",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/icon.png", sizes: "192x192", type: "image/png" }],
    },
    description,
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
      locale: localeToOgLocale[locale] || "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: "Pomobox",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        ko: `${siteUrl}/ko`,
        ja: `${siteUrl}/ja`,
        "zh-CN": `${siteUrl}/zh-CN`,
      },
    },
    verification: {
      other: {
        "naver-site-verification": "e09d920f92485cdb757332999b0dcb5089701a75",
        "google-adsense-account": "ca-pub-7020101743498097",
      },
    },
  }
}

const jsonLd = {
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

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        <AdSenseScript />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <Analytics />
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
