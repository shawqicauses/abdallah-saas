"use client"

// DONE REVIEWING: GITHUB COMMIT 3️⃣

import {ClerkLoaded, ClerkLoading, ClerkProvider} from "@clerk/nextjs"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {httpBatchLink} from "@trpc/client"
import {PropsWithChildren, useState} from "react"
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

  return (
    <ClerkProvider
      appearance={{
        elements: {
          cardBox: "border-0 rounded-none shadow-none",
          card: "rounded-none shadow-none",
          footer: "!bg-gradient-to-r !from-transparent !to-transparent",
          input: "shc-input-base",
          formButtonPrimary:
            "shc-button-base shc-button-normal shc-button-accent text-foreground hover:text-background"
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
