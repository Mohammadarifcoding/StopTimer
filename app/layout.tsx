import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mohammad Arif",
  description: "A showcase of my skills, projects, and experience",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>

          {children}

      </body>
    </html>
  )
}
