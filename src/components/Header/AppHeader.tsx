import Link from "next/link";
import { SheetMenu } from "../Sidebar/SheetMenu";
import { BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, Breadcrumb } from "../ui/breadcrumb";
import { ToggleMode } from "../ToggleMode";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function AppHeader({title, subtitle}:HeaderProps) {
  return(
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/penyaluranElpiji">{title}</Link>
                </BreadcrumbLink>
                {/* <BreadcrumbPage>{title} </BreadcrumbPage> */}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{subtitle} </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* <h1 className="font-bold">{title}</h1> */}
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ToggleMode />
          {/* <UserNav /> */}
        </div>
      </div>
    </header>
  )
}
