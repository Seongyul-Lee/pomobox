import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full px-4 xl:px-8 pb-3 md:ml-16 lg:ml-20">
      {/* Minimal Footer - Desktop */}
      <div className="hidden xl:block text-center text-xs text-muted-foreground py-1">
        <span>© 2025 pomobox</span>
        <span className="mx-2">·</span>
        <Link href="/about" className="hover:text-foreground hover:underline">
          About
        </Link>
        <span className="mx-2">·</span>
        <Link href="/contact" className="hover:text-foreground hover:underline">
          Contact
        </Link>
        <span className="mx-2">·</span>
        <Link href="/privacy" className="hover:text-foreground hover:underline">
          Privacy
        </Link>
        <span className="mx-2">·</span>
        <Link href="/terms" className="hover:text-foreground hover:underline">
          Terms
        </Link>
        <span className="mx-2">·</span>
        <Link href="/faq" className="hover:text-foreground hover:underline">
          FAQ
        </Link>
      </div>

      {/* Minimal Footer - Mobile/Tablet */}
      <div className="xl:hidden text-center text-xs text-muted-foreground py-2 pb-20">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/about" className="hover:text-foreground hover:underline">
            About
          </Link>
          <span className="text-border">·</span>
          <Link href="/contact" className="hover:text-foreground hover:underline">
            Contact
          </Link>
          <span className="text-border">·</span>
          <Link href="/privacy" className="hover:text-foreground hover:underline">
            Privacy
          </Link>
          <span className="text-border">·</span>
          <Link href="/terms" className="hover:text-foreground hover:underline">
            Terms
          </Link>
        </div>
        <div className="mt-2 text-muted-foreground/60">
          © 2025 pomobox
        </div>
      </div>
    </footer>
  )
}
