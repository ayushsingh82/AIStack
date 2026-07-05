import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-black font-sans text-white">
      <div className="relative mx-auto flex h-full min-h-screen w-full max-w-3xl flex-col items-center justify-center border-x border-dashed border-white/15 px-6">
        <div className="absolute left-6 top-10 text-xl font-semibold tracking-tight">
          AIStack
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
