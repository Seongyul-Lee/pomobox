import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Enter your email and we'll send you a reset link",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20 md:pt-4">
      <ForgotPasswordForm />
    </div>
  )
}
