import Link from "next/link";
import { SheetMenu } from "../Sidebar/SheetMenu";
import { BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, Breadcrumb } from "../ui/breadcrumb";
import { ToggleMode } from "../ToggleMode";
import React from "react";

interface HeaderProps {
  home: string;
  mainpage: string;
  childpage?: string;
  childrenpage?: string;
}

export default function AppHeader({ home, mainpage, childpage, childrenpage }: HeaderProps) {

  function toNormalCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle camelCase and PascalCase (splits words where lowercase is followed by uppercase)
      .replace(/-/g, ' ') // Replace kebab-case hyphens with spaces
      .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
      .trim(); // Remove any leading or trailing spaces (if applicable)
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />

          <Breadcrumb>
            <BreadcrumbList>
              {/* Home breadcrumb */}
              <BreadcrumbItem>
                {/* <BreadcrumbLink>
                  <Link href={`/${home}/${mainpage}`}>{toNormalCase(home)}</Link>
                </BreadcrumbLink> */}
                <BreadcrumbPage className={'text-inherit'}>
                  {toNormalCase(home)}
                </BreadcrumbPage>
              </BreadcrumbItem>

              {/* Current page breadcrumb */}
              {mainpage && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {childpage ? 
                      <BreadcrumbLink>
                        <Link href={`/${home}/${mainpage}`}>
                          {toNormalCase(mainpage)}
                        </Link>
                      </BreadcrumbLink>
                      :
                      <BreadcrumbPage>{toNormalCase(mainpage)}</BreadcrumbPage>
                    }
                  </BreadcrumbItem>
                </>
              )}

              {/* Child page breadcrumb (if exists) */}
              {childpage && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {childrenpage ? 
                      <BreadcrumbLink>
                        <Link href={`/${home}/${mainpage}/${childpage}`}>
                          {toNormalCase(childpage)}
                        </Link>
                      </BreadcrumbLink>
                      :
                      <BreadcrumbPage>{toNormalCase(childpage)}</BreadcrumbPage>
                    }
                  </BreadcrumbItem>
                </>
              )}

              {/* Children page breadcrumb (if exists) */}
              {childrenpage && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                      <BreadcrumbPage>{childrenpage}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ToggleMode />
        </div>
      </div>
    </header>
  );
}