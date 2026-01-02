import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { StatsContent } from "@/components/stats/stats-content"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Stats" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
  }
}

export default async function StatsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Stats" })

  return (
    <main
      role="main"
      className="min-h-screen bg-[oklch(98.5%_0.0025_247.8)] dark:bg-[oklch(14.5%_0.00625_285.8)] text-[oklch(21.7%_0.026_264.4)] dark:text-[oklch(100%_0_0)]"
    >
      {/* Mobile header with back button (md 미만) */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <h1 className="text-lg font-semibold">{t("title")}</h1>
      </header>

      {/* Main content area */}
      <div className="md:ml-20 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page header (데스크탑 only) */}
          <section className="hidden md:block">
            <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground mt-1">{t("description")}</p>
          </section>

          {/* Stats content sections */}
          <StatsContent />
        </div>
      </div>
    </main>
  )
}
