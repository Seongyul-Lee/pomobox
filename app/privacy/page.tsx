import type { Metadata } from "next"
import Link from "next/link"
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

const siteUrl = "https://pomobox.app"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pomobox Privacy Policy - How we collect, use, and protect your data",
  openGraph: {
    type: "article",
    locale: "en_US",
    url: `${siteUrl}/privacy`,
    siteName: "Pomobox",
    title: "Privacy Policy",
    description: "Pomobox Privacy Policy - How we collect, use, and protect your data",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description: "Pomobox Privacy Policy - How we collect, use, and protect your data",
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 1, 2026</p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            {/* 1. Introduction */}
            <SectionTitle icon={Shield}>1. Introduction</SectionTitle>
            <Paragraph>Welcome to Pomobox. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.</Paragraph>

            {/* 2. Information We Collect */}
            <SectionTitle icon={Database}>2. Information We Collect</SectionTitle>

            <SubSection>2.1 Account Information (Registered Users)</SubSection>
            <Paragraph>When you create an account, we collect:</Paragraph>
            <List items={[
              "Email address",
              "Encrypted password (hashed, not stored in plain text)",
              "Account creation date",
              "Google OAuth information (if you sign in with Google): Provider ID, email address, and profile image"
            ]} />

            <SubSection>2.2 User Activity Data (Registered Users)</SubSection>
            <Paragraph>When you use Pomobox while logged in, we collect:</Paragraph>
            <List items={[
              "Focus session records (duration, completion time)",
              "Daily statistics (date, session count, total focus minutes)",
              "Attendance check-in records",
              "Streak statistics (consecutive days)"
            ]} />

            <SubSection>2.3 Local Storage (All Users)</SubSection>
            <Paragraph>For users who are not logged in, we store data locally in your browser using localStorage. This data includes:</Paragraph>
            <List items={[
              "Timer settings and preferences",
              "Session history",
              "Daily statistics",
              "Attendance records"
            ]} />
            <Paragraph>This data never leaves your device and is not accessible to us. You can clear this data at any time through your browser settings.</Paragraph>

            <SubSection>2.4 Automatically Collected Information</SubSection>
            <Paragraph>When you use Pomobox, we may automatically collect:</Paragraph>
            <List items={[
              "Device information (browser type, operating system)",
              "Usage data (pages visited, time spent)",
              "IP address (anonymized)"
            ]} />

            {/* 2.5 Cookies */}
            <SectionTitle icon={Cookie}>2.5 Cookies and Similar Technologies</SectionTitle>
            <Paragraph>We use cookies and similar tracking technologies for authentication and to improve your experience. Essential cookies are required for the service to function properly.</Paragraph>

            {/* 3. Third-Party Services */}
            <SectionTitle icon={Server}>3. Third-Party Services</SectionTitle>

            <SubSection>3.1 Supabase</SubSection>
            <Paragraph>
              We use Supabase as our database and authentication provider. Supabase stores your account information and activity data on secure servers.{" "}
              <ExternalLinkStyled href="https://supabase.com/privacy">
                Supabase Privacy Policy
              </ExternalLinkStyled>
            </Paragraph>

            <SubSection>3.2 Vercel</SubSection>
            <Paragraph>
              Our website is hosted on Vercel. Vercel may collect anonymous usage data and logs.{" "}
              <ExternalLinkStyled href="https://vercel.com/legal/privacy-policy">
                Vercel Privacy Policy
              </ExternalLinkStyled>
            </Paragraph>

            <SubSection>3.3 Google AdSense</SubSection>
            <Paragraph>
              We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting{" "}
              <ExternalLinkStyled href="https://www.google.com/settings/ads">
                Google Ads Settings
              </ExternalLinkStyled>
            </Paragraph>

            <SubSection>3.4 Resend</SubSection>
            <Paragraph>
              We use Resend as our email delivery service for sending authentication and notification emails (such as password reset links and account verification).{" "}
              <ExternalLinkStyled href="https://resend.com/legal/privacy-policy">
                Resend Privacy Policy
              </ExternalLinkStyled>
            </Paragraph>

            {/* 4. How We Use */}
            <SectionTitle icon={Database}>4. How We Use Your Information</SectionTitle>
            <Paragraph>We use the collected information to:</Paragraph>
            <List items={[
              "Provide and maintain our service",
              "Authenticate your account and keep you signed in",
              "Sync your focus data across devices (registered users)",
              "Display your productivity statistics",
              "Improve user experience",
              "Display relevant advertisements",
              "Analyze usage patterns"
            ]} />

            {/* 5. Data Storage */}
            <SectionTitle icon={Server}>5. Data Storage and Retention</SectionTitle>

            <SubSection>5.1 Registered Users</SubSection>
            <Paragraph>Your account and activity data is stored on Supabase servers. We retain your data for as long as your account is active. If you delete your account, your data will be permanently deleted immediately.</Paragraph>

            <SubSection>5.2 Non-Registered Users</SubSection>
            <Paragraph>If you use Pomobox without an account, all your data is stored locally in your browser (localStorage). This data is not transmitted to our servers and remains on your device until you clear your browser data.</Paragraph>

            {/* 6. Data Security */}
            <SectionTitle icon={Lock}>6. Data Security</SectionTitle>
            <Paragraph>We implement appropriate security measures to protect your data:</Paragraph>
            <List items={[
              "All data is transmitted over HTTPS (encrypted connection)",
              "Passwords are hashed using industry-standard algorithms",
              "Database access is protected by Row Level Security (RLS) policies",
              "We regularly review and update our security practices"
            ]} />

            {/* 7. GDPR */}
            <SectionTitle icon={Scale}>7. Your Rights (GDPR)</SectionTitle>
            <Paragraph>If you are in the European Economic Area, you have the right to:</Paragraph>
            <List items={[
              "Access your personal data",
              "Rectify inaccurate data",
              "Request deletion of your data",
              "Object to data processing",
              "Data portability",
              "Withdraw consent at any time"
            ]} />

            {/* 8. CCPA */}
            <SectionTitle icon={Scale}>8. Your Rights (CCPA)</SectionTitle>
            <Paragraph>If you are a California resident, you have the right to:</Paragraph>
            <List items={[
              "Know what personal information is collected",
              "Know whether your personal information is sold or disclosed",
              "Say no to the sale of personal information (we do not sell your data)",
              "Request deletion of your personal information",
              "Not be discriminated against for exercising your privacy rights"
            ]} />

            {/* 9. Delete Data */}
            <SectionTitle icon={Trash2}>9. How to Delete Your Data</SectionTitle>

            <SubSection>9.1 Registered Users</SubSection>
            <Paragraph>You can permanently delete your account and all associated data at any time through the 'Delete Account' option in your My Account page. The deletion is immediate and irreversible.</Paragraph>

            <SubSection>9.2 Non-Registered Users</SubSection>
            <Paragraph>To delete your local data:</Paragraph>
            <OrderedList items={[
              "Open your browser settings",
              "Navigate to Privacy or Site Settings",
              "Find and clear site data for pomobox.app"
            ]} />
            <Paragraph>Alternatively, you can clear all browsing data or use your browser's developer tools to clear localStorage.</Paragraph>

            {/* 10. Children */}
            <SectionTitle icon={Baby}>10. Children's Privacy</SectionTitle>
            <Paragraph>Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</Paragraph>

            {/* 11. Changes */}
            <SectionTitle icon={Bell}>11. Changes to This Policy</SectionTitle>
            <Paragraph>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</Paragraph>

            {/* 12. Contact */}
            <SectionTitle icon={Mail}>12. Contact Us</SectionTitle>
            <Paragraph>
              If you have questions about this privacy policy or want to exercise your data rights, please contact us at:{" "}
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
    </main>
  )
}
