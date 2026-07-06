import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-black font-sans text-white">
      <div className="relative mx-auto flex h-full min-h-screen w-full max-w-3xl flex-col items-center justify-center border-x border-dashed border-white/15 px-6">
        <div className="absolute left-6 top-10 text-xl font-semibold tracking-tight">
          AIStack
        </div>
        <div className="absolute right-6 top-10 flex items-center gap-4">
          <a
            href="https://github.com/ayushsingh82/AIStack"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/70 transition-colors hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.41-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55C20.71 21.41 24 17.09 24 12 24 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>
          <a
            href="https://x.com/eth_ay32"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-white/70 transition-colors hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.9 2H22l-7.6 8.68L23.4 22H16.6l-5.3-6.9L4.9 22H1.8l8.13-9.29L1 2h6.9l4.8 6.34L18.9 2Zm-1.2 18h1.7L7.4 4h-1.8l12.1 16Z" />
            </svg>
          </a>
        </div>
        <main className="flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            The Complete Path to AI Engineering
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-gray-400">
            Free and community-driven, AIStack helps you master{" "}
            <span className="text-white">AI Engineering</span> with the power
            of structured learning, hands-on projects, and real-world
            production practices.
          </p>
          <Link
            href="/docs"
            className="mt-10 flex h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Docs
          </Link>
        </main>
      </div>
    </div>
  );
}
