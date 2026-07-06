import Sidebar from "./Sidebar";
import DocsShell from "./DocsShell";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell sidebar={<Sidebar />}>{children}</DocsShell>;
}
