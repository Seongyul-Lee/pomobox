import type { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import {
  ArrowLeft,
  Timer,
  Brain,
  Zap,
  ListTodo,
  Clock,
  Target,
  Coffee,
  Repeat,
  Music,
  BarChart3,
  Calendar,
  ChevronDown,
} from "lucide-react"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("Guide")

  const siteUrl = "https://pomobox.app"

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      type: "article",
      locale: locale === "ko" ? "ko_KR" : locale === "ja" ? "ja_JP" : locale === "zh-CN" ? "zh_CN" : "en_US",
      url: `${siteUrl}/${locale}/guide/what-is-pomodoro`,
      siteName: "Pomobox",
      title: t("meta.title"),
      description: t("meta.description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/guide/what-is-pomodoro`,
      languages: {
        en: `${siteUrl}/en/guide/what-is-pomodoro`,
        ko: `${siteUrl}/ko/guide/what-is-pomodoro`,
        ja: `${siteUrl}/ja/guide/what-is-pomodoro`,
        "zh-CN": `${siteUrl}/zh-CN/guide/what-is-pomodoro`,
      },
    },
  }
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
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

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
        <span className="text-lg font-bold text-primary">{number}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-4 w-4 text-primary" />
          <h3 className="font-medium text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function BenefitCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
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
    <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>
      <p className="mt-3 text-muted-foreground leading-relaxed">{answer}</p>
    </details>
  )
}

export default async function WhatIsPomodoroPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations("Guide")

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {t("backToTimer")}
        </Link>

        {/* Main Content Card */}
        <article className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Hero Section */}
          <header className="text-center mb-10 pb-8 border-b border-white/10">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-4">
              <Timer className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground text-lg">{t("hero.subtitle")}</p>
          </header>

          {/* Content */}
          <div className="space-y-2">
            {/* What is Pomodoro */}
            <SectionTitle icon={Brain}>{t("sections.whatIs.title")}</SectionTitle>
            <Paragraph>{t("sections.whatIs.content")}</Paragraph>

            {/* How to Use */}
            <SectionTitle icon={ListTodo}>{t("sections.howTo.title")}</SectionTitle>
            <div className="space-y-3">
              <StepCard
                number={1}
                icon={ListTodo}
                title={t("sections.howTo.step1.title")}
                description={t("sections.howTo.step1.desc")}
              />
              <StepCard
                number={2}
                icon={Clock}
                title={t("sections.howTo.step2.title")}
                description={t("sections.howTo.step2.desc")}
              />
              <StepCard
                number={3}
                icon={Target}
                title={t("sections.howTo.step3.title")}
                description={t("sections.howTo.step3.desc")}
              />
              <StepCard
                number={4}
                icon={Coffee}
                title={t("sections.howTo.step4.title")}
                description={t("sections.howTo.step4.desc")}
              />
              <StepCard
                number={5}
                icon={Repeat}
                title={t("sections.howTo.step5.title")}
                description={t("sections.howTo.step5.desc")}
              />
            </div>

            {/* Why it Works */}
            <SectionTitle icon={Zap}>{t("sections.whyWorks.title")}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BenefitCard
                icon={Brain}
                title={t("sections.whyWorks.benefit1.title")}
                description={t("sections.whyWorks.benefit1.desc")}
              />
              <BenefitCard
                icon={Target}
                title={t("sections.whyWorks.benefit2.title")}
                description={t("sections.whyWorks.benefit2.desc")}
              />
              <BenefitCard
                icon={Clock}
                title={t("sections.whyWorks.benefit3.title")}
                description={t("sections.whyWorks.benefit3.desc")}
              />
              <BenefitCard
                icon={Zap}
                title={t("sections.whyWorks.benefit4.title")}
                description={t("sections.whyWorks.benefit4.desc")}
              />
            </div>

            {/* Pomobox Features */}
            <SectionTitle icon={Timer}>{t("sections.pomobox.title")}</SectionTitle>
            <div className="space-y-3 mb-6">
              <FeatureCard
                icon={Music}
                title={t("sections.pomobox.feature1.title")}
                description={t("sections.pomobox.feature1.desc")}
              />
              <FeatureCard
                icon={BarChart3}
                title={t("sections.pomobox.feature2.title")}
                description={t("sections.pomobox.feature2.desc")}
              />
              <FeatureCard
                icon={Calendar}
                title={t("sections.pomobox.feature3.title")}
                description={t("sections.pomobox.feature3.desc")}
              />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center py-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Timer className="h-5 w-5" />
                {t("startTimer")}
              </Link>
            </div>

            {/* FAQ */}
            <SectionTitle icon={Brain}>{t("sections.faq.title")}</SectionTitle>
            <div className="space-y-3">
              <FaqItem
                question={t("sections.faq.q1.q")}
                answer={t("sections.faq.q1.a")}
              />
              <FaqItem
                question={t("sections.faq.q2.q")}
                answer={t("sections.faq.q2.a")}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t("backToTimer")}
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
