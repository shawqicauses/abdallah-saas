// DONE REVIEWING: GITHUB COMMIT 4️⃣

import {Poppins} from "next/font/google"
import {PropsWithChildren} from "react"
import "../styles/global.css"
import Providers from "./providers"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

const Layout = function Layout({children}: PropsWithChildren) {
  return (
    <html lang="en" className="dark h-full">
      <head />
      <body className={`${poppins.className} h-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default Layout
