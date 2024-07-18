// DONE REVIEWING: GITHUB COMMIT

import MosquesSearch from "./mosques-search"

const Hero = function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-xl-3 sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-light to-primary-dark opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74% 44%, 100% 61%, 97% 26%, 85% 0%, 80% 2%, 72% 32%, 60% 62%, 52% 68%, 47% 58%, 45% 34%, 27% 76%, 0% 64%, 17% 100%, 27% 76%, 76% 97%, 74% 44%)"
          }}
        />
      </div>
      <div className="mx-auto max-w-xl-2 py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="mx-auto max-w-sm text-xl-3 font-bold capitalize tracking-tight text-foreground sm:text-xl-4 md:max-w-none md:text-xl-6">
            The first software for <span className="text-primary">mosques</span>&apos; visitors.
          </h1>
          <p className="mx-auto mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            The first SaaS application for mosques visitors, where you can search, add, edit and
            delete the visitors of your mosque easily using our software.
          </p>
          <div className="mx-auto mt-10 max-w-md">
            <MosquesSearch />
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-xl-3 sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-light to-primary-dark opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74% 44%, 100% 61%, 97% 26%, 85% 0%, 80% 2%, 72% 32%, 60% 62%, 52% 68%, 47% 58%, 45% 34%, 27% 76%, 0% 64%, 17% 100%, 27% 76%, 76% 97%, 74% 44%)"
          }}
        />
      </div>
    </div>
  )
}

export default Hero
