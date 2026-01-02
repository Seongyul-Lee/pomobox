import type { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
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

type Props = {
  params: Promise<{ locale: string }>
}

const siteUrl = "https://pomobox.app"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("Terms")

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "article",
      locale: locale === "ko" ? "ko_KR" : locale === "ja" ? "ja_JP" : locale === "zh-CN" ? "zh_CN" : "en_US",
      url: `${siteUrl}/${locale}/terms`,
      siteName: "Pomobox",
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/terms`,
      languages: {
        en: `${siteUrl}/en/terms`,
        ko: `${siteUrl}/ko/terms`,
        ja: `${siteUrl}/ja/terms`,
        "zh-CN": `${siteUrl}/zh-CN/terms`,
      },
    },
  }
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

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations("Terms")

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {t("backToHome")}
        </Link>

        {/* Main Content Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t("title")}</h1>
            <p className="text-muted-foreground">Last updated: {t("lastUpdated")}</p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            {/* 1. Acceptance */}
            <SectionTitle icon={CheckCircle}>{t("acceptance.title")}</SectionTitle>
            <Paragraph>{t("acceptance.content")}</Paragraph>

            {/* 2. Service Description */}
            <SectionTitle icon={FileText}>{t("service.title")}</SectionTitle>
            <Paragraph>{t("service.content")}</Paragraph>
            <List items={t.raw("service.items") as string[]} />

            {/* 3. User Accounts */}
            <SectionTitle icon={User}>{t("accounts.title")}</SectionTitle>
            <Paragraph>{t("accounts.content")}</Paragraph>
            <List items={t.raw("accounts.items") as string[]} />

            {/* 4. Acceptable Use */}
            <SectionTitle icon={AlertTriangle}>{t("acceptableUse.title")}</SectionTitle>
            <Paragraph>{t("acceptableUse.content")}</Paragraph>
            <List items={t.raw("acceptableUse.items") as string[]} />

            {/* 5. Intellectual Property */}
            <SectionTitle icon={Shield}>{t("intellectualProperty.title")}</SectionTitle>
            <Paragraph>{t("intellectualProperty.content")}</Paragraph>

            {/* 6. Disclaimer */}
            <SectionTitle icon={AlertTriangle}>{t("disclaimer.title")}</SectionTitle>
            <Paragraph>{t("disclaimer.content")}</Paragraph>

            {/* 7. Limitation of Liability */}
            <SectionTitle icon={Scale}>{t("liability.title")}</SectionTitle>
            <Paragraph>{t("liability.content")}</Paragraph>

            {/* 8. Changes to Terms */}
            <SectionTitle icon={RefreshCw}>{t("changes.title")}</SectionTitle>
            <Paragraph>{t("changes.content")}</Paragraph>

            {/* 9. Termination */}
            <SectionTitle icon={XCircle}>{t("termination.title")}</SectionTitle>
            <Paragraph>{t("termination.content")}</Paragraph>

            {/* 10. Governing Law */}
            <SectionTitle icon={Globe}>{t("governingLaw.title")}</SectionTitle>
            <Paragraph>{t("governingLaw.content")}</Paragraph>

            {/* 11. Contact */}
            <SectionTitle icon={Mail}>{t("contact.title")}</SectionTitle>
            <Paragraph>
              {t("contact.content")}{" "}
              <a href={`mailto:${t("contact.email")}`} className="text-primary hover:underline">
                {t("contact.email")}
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
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
