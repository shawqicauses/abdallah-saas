// DONE REVIEWING: GITHUB COMMIT 1️⃣
import {PropsWithChildren} from "react"

const AuthLayout = function AuthLayout({children}: PropsWithChildren) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl-7 items-center justify-center px-5 py-16">
      {children}
    </div>
  )
}

export default AuthLayout
