import Link from "next/link";
import Sidebar from "./Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <aside className="sticky top-0 h-screen w-72 shrink-0 overflow-y-auto border-r border-white/10 px-4 py-6">
        <Link href="/" className="mb-6 block px-2 text-lg font-semibold">
          AIStack Docs
        </Link>
        <Sidebar />
      </aside>
      <main className="min-w-0 flex-1 px-10 py-10">{children}</main>
    </div>
  );
}
