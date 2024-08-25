import { Navbar } from "@/components/admin-panel/navbar";
import BreadCrumbs from "./breadcrumbs";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="p-4 h-full">
        {children}
      </div>
    </div>
  );
}
