import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-muted-foreground">Start tracking your productivity</p>
        </div>

        <AuthForm mode="signup" />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>

        <p className="text-center text-sm">
          <Link href="/" className="text-muted-foreground hover:underline">
            Back to Timer
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
