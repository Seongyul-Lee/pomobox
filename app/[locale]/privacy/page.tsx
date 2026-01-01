import type { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import {
  ArrowLeft,
  Shield,
  Database,
  Cookie,
  Server,
  Lock,
  Scale,
  Trash2,
  Baby,
  Bell,
  Mail,
  ExternalLink,
} from "lucide-react"

type Props = {
  params: Promise<{ locale: string }>
}

const siteUrl = "https://pomobox.app"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("Privacy")

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "article",
      locale: locale === "ko" ? "ko_KR" : locale === "ja" ? "ja_JP" : locale === "zh-CN" ? "zh_CN" : "en_US",
      url: `${siteUrl}/${locale}/privacy`,
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
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: {
        en: `${siteUrl}/en/privacy`,
        ko: `${siteUrl}/ko/privacy`,
        ja: `${siteUrl}/ja/privacy`,
        "zh-CN": `${siteUrl}/zh-CN/privacy`,
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

function SubSection({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-medium text-foreground/90 mt-6 mb-3">{children}</h3>
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

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4 ml-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  )
}

function ExternalLinkStyled({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1 transition-colors"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  )
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations("Privacy")

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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t("title")}</h1>
            <p className="text-muted-foreground">Last updated: {t("lastUpdated")}</p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            {/* 1. Introduction */}
            <SectionTitle icon={Shield}>{t("intro.title")}</SectionTitle>
            <Paragraph>{t("intro.content")}</Paragraph>

            {/* 2. Information We Collect */}
            <SectionTitle icon={Database}>{t("collection.title")}</SectionTitle>

            <SubSection>{t("collection.accountInfo.title")}</SubSection>
            <Paragraph>{t("collection.accountInfo.content")}</Paragraph>
            <List items={t.raw("collection.accountInfo.items") as string[]} />

            <SubSection>{t("collection.activityData.title")}</SubSection>
            <Paragraph>{t("collection.activityData.content")}</Paragraph>
            <List items={t.raw("collection.activityData.items") as string[]} />

            <SubSection>{t("collection.localStorage.title")}</SubSection>
            <Paragraph>{t("collection.localStorage.content")}</Paragraph>
            <List items={t.raw("collection.localStorage.items") as string[]} />
            <Paragraph>{t("collection.localStorage.note")}</Paragraph>

            <SubSection>{t("collection.automatic.title")}</SubSection>
            <Paragraph>{t("collection.automatic.content")}</Paragraph>
            <List items={t.raw("collection.automatic.items") as string[]} />

            {/* 2.5 Cookies */}
            <SectionTitle icon={Cookie}>{t("collection.cookies.title")}</SectionTitle>
            <Paragraph>{t("collection.cookies.content")}</Paragraph>

            {/* 3. Third-Party Services */}
            <SectionTitle icon={Server}>{t("thirdParty.title")}</SectionTitle>

            <SubSection>{t("thirdParty.supabase.title")}</SubSection>
            <Paragraph>
              {t("thirdParty.supabase.content")}{" "}
              <ExternalLinkStyled href={t("thirdParty.supabase.link")}>
                {t("thirdParty.supabase.linkText")}
              </ExternalLinkStyled>
            </Paragraph>

            <SubSection>{t("thirdParty.vercel.title")}</SubSection>
            <Paragraph>
              {t("thirdParty.vercel.content")}{" "}
              <ExternalLinkStyled href={t("thirdParty.vercel.link")}>
                {t("thirdParty.vercel.linkText")}
              </ExternalLinkStyled>
            </Paragraph>

            <SubSection>{t("thirdParty.adsense.title")}</SubSection>
            <Paragraph>
              {t("thirdParty.adsense.content")}{" "}
              <ExternalLinkStyled href={t("thirdParty.adsense.link")}>
                {t("thirdParty.adsense.linkText")}
              </ExternalLinkStyled>
            </Paragraph>

            <SubSection>{t("thirdParty.resend.title")}</SubSection>
            <Paragraph>
              {t("thirdParty.resend.content")}{" "}
              <ExternalLinkStyled href={t("thirdParty.resend.link")}>
                {t("thirdParty.resend.linkText")}
              </ExternalLinkStyled>
            </Paragraph>

            {/* 4. How We Use */}
            <SectionTitle icon={Database}>{t("usage.title")}</SectionTitle>
            <Paragraph>{t("usage.content")}</Paragraph>
            <List items={t.raw("usage.items") as string[]} />

            {/* 5. Data Storage */}
            <SectionTitle icon={Server}>{t("storage.title")}</SectionTitle>

            <SubSection>{t("storage.registered.title")}</SubSection>
            <Paragraph>{t("storage.registered.content")}</Paragraph>

            <SubSection>{t("storage.nonRegistered.title")}</SubSection>
            <Paragraph>{t("storage.nonRegistered.content")}</Paragraph>

            {/* 6. Data Security */}
            <SectionTitle icon={Lock}>{t("security.title")}</SectionTitle>
            <Paragraph>{t("security.content")}</Paragraph>
            <List items={t.raw("security.items") as string[]} />

            {/* 7. GDPR */}
            <SectionTitle icon={Scale}>{t("gdpr.title")}</SectionTitle>
            <Paragraph>{t("gdpr.content")}</Paragraph>
            <List items={t.raw("gdpr.items") as string[]} />

            {/* 8. CCPA */}
            <SectionTitle icon={Scale}>{t("ccpa.title")}</SectionTitle>
            <Paragraph>{t("ccpa.content")}</Paragraph>
            <List items={t.raw("ccpa.items") as string[]} />

            {/* 9. Delete Data */}
            <SectionTitle icon={Trash2}>{t("deletion.title")}</SectionTitle>

            <SubSection>{t("deletion.registered.title")}</SubSection>
            <Paragraph>{t("deletion.registered.content")}</Paragraph>

            <SubSection>{t("deletion.nonRegistered.title")}</SubSection>
            <Paragraph>{t("deletion.nonRegistered.content")}</Paragraph>
            <OrderedList items={t.raw("deletion.nonRegistered.steps") as string[]} />
            <Paragraph>{t("deletion.nonRegistered.note")}</Paragraph>

            {/* 10. Children */}
            <SectionTitle icon={Baby}>{t("children.title")}</SectionTitle>
            <Paragraph>{t("children.content")}</Paragraph>

            {/* 11. Changes */}
            <SectionTitle icon={Bell}>{t("changes.title")}</SectionTitle>
            <Paragraph>{t("changes.content")}</Paragraph>

            {/* 12. Contact */}
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
