// DONE REVIEWING: GITHUB COMMIT
import {PropsWithChildren} from "react"
import Header from "./_components/header"
import SideNavigation from "./_components/side-navigation"

const DashboardLayout = function DashboardLayout({children}: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavigation />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
