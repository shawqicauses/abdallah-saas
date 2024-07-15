// DONE REVIEWING: GITHUB COMMIT 3️⃣
import {PropsWithChildren} from "react"
import Header from "./_components/header"
import DashboardRedirect from "./_components/redirect"
import SideNavigation from "./_components/side-navigation"

const DashboardLayout = async function DashboardLayout({children}: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavigation />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
          <DashboardRedirect>{children}</DashboardRedirect>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
