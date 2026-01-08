import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 md:pt-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to sync your focus sessions</p>
        </div>

        <AuthForm mode="login" />

        <p className="text-center text-sm text-muted-foreground">
          {"Don't have an account?"}{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-center text-sm">
          <Link href="/" className="text-muted-foreground hover:underline">
            Back to Timer
          </Link>
        </p>
      </div>
    </div>
  )
}
