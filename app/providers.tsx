"use client"

// DONE REVIEWING: GITHUB COMMIT 5️⃣

/* eslint import/no-extraneous-dependencies: "off" */

import {ClerkLoaded, ClerkLoading, ClerkProvider} from "@clerk/nextjs"
import {dark} from "@clerk/themes"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {httpBatchLink} from "@trpc/client"
import {PropsWithChildren, useEffect, useState} from "react"
import rgbHex from "rgb-hex"
import trpc from "../client"
import Loading from "../components/loading"
import {Toaster} from "../components/ui"

const createQueryClient = function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined

const getQueryClient = function getQueryClient() {
  if (typeof window === "undefined") return createQueryClient()
  if (!browserQueryClient) browserQueryClient = createQueryClient()
  return browserQueryClient
}

const Providers = function Providers({children}: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc"
        })
      ]
    })
  )

  useEffect(() => {
    setMounted(true)
    if (document.documentElement.classList.contains("dark")) setIsDarkMode(true)
  }, [])

  if (!mounted) return null

  const getRGBColorValues = function getRGBColorValues(color: string) {
    const rgb = getComputedStyle(document.querySelector(":root")!)
      .getPropertyValue(color)
      .split(" ")
    return `#${rgbHex(Number(rgb[0]), Number(rgb[1]), Number(rgb[2]))}`
  }

  const colorPrimary = getRGBColorValues("--primary")
  const colorBackground = getRGBColorValues("--background")

  return (
    <ClerkProvider
      appearance={{
        baseTheme: isDarkMode ? dark : undefined,
        variables: {
          colorPrimary,
          colorBackground
        },
        elements: {
          cardBox: "border-0 shadow-none",
          card: "bg-transparent p-2 border-0 shadow-none",
          input: "shc-input-base",
          footer: "bg-gradient-to-r from-transparent to-transparent"
        }
      }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ClerkLoading>
            <Loading />
          </ClerkLoading>
          <ClerkLoaded>{children}</ClerkLoaded>
          <Toaster />
        </QueryClientProvider>
      </trpc.Provider>
    </ClerkProvider>
  )
}

export default Providers
