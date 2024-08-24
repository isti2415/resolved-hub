import { Navbar } from "@/components/admin-panel/navbar";
import BreadCrumbs from "./breadcrumbs";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="py-4 px-4 h-full">
        {children}
      </div>
    </div>
  );
}
