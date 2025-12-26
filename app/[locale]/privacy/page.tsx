import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pomobox Privacy Policy - How we collect and use your data",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground no-underline mb-8 inline-block"
        >
          &larr; Back to Pomobox
        </Link>

        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: December 26, 2024</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Pomobox. We respect your privacy and are committed to
          protecting your personal data. This privacy policy explains how we
          collect, use, and safeguard your information when you use our service.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Account Information (Registered Users)</h3>
        <p>When you create an account, we collect:</p>
        <ul>
          <li>Email address</li>
          <li>Encrypted password (hashed, not stored in plain text)</li>
          <li>Account creation date</li>
        </ul>

        <h3>2.2 User Activity Data (Registered Users)</h3>
        <p>When you use Pomobox while logged in, we collect:</p>
        <ul>
          <li>Focus session records (duration, completion time)</li>
          <li>Daily statistics (date, session count, total focus minutes)</li>
          <li>Attendance check-in records</li>
          <li>Streak statistics (consecutive days)</li>
        </ul>

        <h3>2.3 Local Storage (All Users)</h3>
        <p>
          For users who are not logged in, we store data locally in your browser
          using localStorage. This data includes:
        </p>
        <ul>
          <li>Timer settings and preferences</li>
          <li>Session history</li>
          <li>Daily statistics</li>
          <li>Attendance records</li>
        </ul>
        <p>
          This data never leaves your device and is not accessible to us. You can
          clear this data at any time through your browser settings.
        </p>

        <h3>2.4 Automatically Collected Information</h3>
        <p>When you use Pomobox, we may automatically collect:</p>
        <ul>
          <li>Device information (browser type, operating system)</li>
          <li>Usage data (pages visited, time spent)</li>
          <li>IP address (anonymized)</li>
        </ul>

        <h3>2.5 Cookies and Similar Technologies</h3>
        <p>
          We use cookies and similar tracking technologies for authentication
          and to improve your experience. Essential cookies are required for
          the service to function properly.
        </p>

        <h2>3. Third-Party Services</h2>

        <h3>3.1 Supabase</h3>
        <p>
          We use Supabase as our database and authentication provider. Supabase
          stores your account information and activity data on secure servers.
          For more information, see{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase Privacy Policy
          </a>
          .
        </p>

        <h3>3.2 Vercel</h3>
        <p>
          Our website is hosted on Vercel. Vercel may collect anonymous usage
          data and logs. For more information, see{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Privacy Policy
          </a>
          .
        </p>

        <h3>3.3 Google AdSense</h3>
        <p>
          We use Google AdSense to display advertisements. Google may use cookies
          to serve ads based on your prior visits to this or other websites.
          You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </p>

        <h2>4. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and maintain our service</li>
          <li>Authenticate your account and keep you signed in</li>
          <li>Sync your focus data across devices (registered users)</li>
          <li>Display your productivity statistics</li>
          <li>Improve user experience</li>
          <li>Display relevant advertisements</li>
          <li>Analyze usage patterns</li>
        </ul>

        <h2>5. Data Storage and Retention</h2>

        <h3>5.1 Registered Users</h3>
        <p>
          Your account and activity data is stored on Supabase servers. We retain
          your data for as long as your account is active. If you delete your
          account, your data will be permanently deleted within 30 days.
        </p>

        <h3>5.2 Non-Registered Users</h3>
        <p>
          If you use Pomobox without an account, all your data is stored locally
          in your browser (localStorage). This data is not transmitted to our
          servers and remains on your device until you clear your browser data.
        </p>

        <h2>6. Data Security</h2>
        <p>We implement appropriate security measures to protect your data:</p>
        <ul>
          <li>All data is transmitted over HTTPS (encrypted connection)</li>
          <li>Passwords are hashed using industry-standard algorithms</li>
          <li>Database access is protected by Row Level Security (RLS) policies</li>
          <li>We regularly review and update our security practices</li>
        </ul>

        <h2>7. Your Rights (GDPR)</h2>
        <p>If you are in the European Economic Area, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Rectify inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>8. Your Rights (CCPA)</h2>
        <p>If you are a California resident, you have the right to:</p>
        <ul>
          <li>Know what personal information is collected</li>
          <li>Know whether your personal information is sold or disclosed</li>
          <li>Say no to the sale of personal information (we do not sell your data)</li>
          <li>Request deletion of your personal information</li>
          <li>Not be discriminated against for exercising your privacy rights</li>
        </ul>

        <h2>9. How to Delete Your Data</h2>

        <h3>9.1 Registered Users</h3>
        <p>
          To delete your account and all associated data, please contact us at{" "}
          <a href="mailto:pomoboxapp@gmail.com">pomoboxapp@gmail.com</a> with your
          account email address. We will process your request within 30 days.
        </p>

        <h3>9.2 Non-Registered Users</h3>
        <p>To delete your local data:</p>
        <ol>
          <li>Open your browser settings</li>
          <li>Navigate to Privacy or Site Settings</li>
          <li>Find and clear site data for pomobox.app</li>
        </ol>
        <p>
          Alternatively, you can clear all browsing data or use your browser&apos;s
          developer tools to clear localStorage.
        </p>

        <h2>10. Children&apos;s Privacy</h2>
        <p>
          Our service is not directed to children under 13. We do not knowingly
          collect personal information from children under 13. If you are a parent
          or guardian and believe your child has provided us with personal
          information, please contact us.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page and updating
          the &quot;Last updated&quot; date.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have questions about this privacy policy or want to exercise
          your data rights, please contact us at:{" "}
          <a href="mailto:pomoboxapp@gmail.com">pomoboxapp@gmail.com</a>
        </p>

        <div className="mt-12 pt-8 border-t">
          <Link href="/" className="text-primary hover:underline">
            &larr; Back to Pomobox
          </Link>
        </div>
      </div>
    </main>
  )
}
