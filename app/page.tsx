// DONE REVIEWING: GITHUB COMMIT 4️⃣

import Footer from "./_components/footer"
import Header from "./_components/header"
import Hero from "./_components/hero"
import MosquesVisitors from "./_components/mosques-visitors"

const Page = async function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <MosquesVisitors />
      <Footer />
    </main>
  )
}

export default Page
