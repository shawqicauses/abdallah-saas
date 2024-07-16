// DONE REVIEWING: GITHUB COMMIT 2️⃣
import {TreePalmIcon} from "lucide-react"
import {PropsWithChildren} from "react"

const AuthLayout = function AuthLayout({children}: PropsWithChildren) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl-7 flex-col items-center justify-center px-5 py-16">
      <div className="group mb-5 flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semi-bold text-primary-foreground md:h-16 md:w-16 md:text-base">
        <TreePalmIcon
          aria-hidden="true"
          className="h-6 w-6 transition-all group-hover:scale-110 md:h-10 md:w-10"
        />
        <span className="sr-only">Abd Allah SaaS</span>
      </div>
      {children}
    </div>
  )
}

export default AuthLayout
