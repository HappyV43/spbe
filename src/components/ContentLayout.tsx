import AppHeader from "./Header/AppHeader";

interface ContentLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, subtitle, children }: ContentLayoutProps) {
  return (
    <div>
      <AppHeader title={title} subtitle={subtitle}/>
      <div>{children}</div>
    </div>
  );
}
