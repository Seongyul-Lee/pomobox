import type { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import {
  ArrowLeft,
  Info,
  Timer,
  BarChart3,
  Music,
  Calendar,
  Zap,
  Globe,
} from "lucide-react"

type Props = {
  params: Promise<{ locale: string }>
}

const siteUrl = "https://pomobox.app"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("About")

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : locale === "ja" ? "ja_JP" : locale === "zh-CN" ? "zh_CN" : "en_US",
      url: `${siteUrl}/${locale}/about`,
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
      canonical: `${siteUrl}/${locale}/about`,
      languages: {
        en: `${siteUrl}/en/about`,
        ko: `${siteUrl}/ko/about`,
        ja: `${siteUrl}/ja/about`,
        "zh-CN": `${siteUrl}/zh-CN/about`,
      },
    },
  }
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations("About")

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
              <Info className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>

          {/* What is Pomobox */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t("whatIs.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("whatIs.content1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("whatIs.content2")}
            </p>
          </section>

          {/* Features */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {t("features.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={Timer}
                title={t("features.timer.title")}
                description={t("features.timer.description")}
              />
              <FeatureCard
                icon={BarChart3}
                title={t("features.stats.title")}
                description={t("features.stats.description")}
              />
              <FeatureCard
                icon={Music}
                title={t("features.bgm.title")}
                description={t("features.bgm.description")}
              />
              <FeatureCard
                icon={Calendar}
                title={t("features.calendar.title")}
                description={t("features.calendar.description")}
              />
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-6 px-4 rounded-xl bg-primary/5">
            <p className="text-foreground font-medium mb-4">{t("cta.text")}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Timer className="h-5 w-5" />
              {t("cta.button")}
            </Link>
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
