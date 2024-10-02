import { Database, House, LucideIcon, Settings, User } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: House,
          submenus: [
            {
              href: "/dashboard/penyaluranElpiji",
              label: "Penyaluran Elpiji",
              active: pathname === "/dashboard/penyaluranElpiji"
            },
            {
              href: "/dashboard/alokasi",
              label: "Alokasi",
              active: pathname === "/dashboard/alokasi"
            },
            {
              href: "/dashboard/cetakPenyaluran",
              label: "Cetak Penyaluran",
              active: pathname === "/dashboard/cetakPenyaluran"
            }
          ]
        }
      ]
    },
    {
      groupLabel: "Master Data",
      menus: [
        {
          href: "/masterData",
          label: "Master Data",
          active: pathname.includes("/masterData"),
          icon: Database,
          submenus: [
            {
              href: "/masterData/agen",
              label: "Agen",
              active: pathname === "/masterData/agen"
            },
            {
              href: "/masterData/company",
              label: "Company",
              active: pathname === "/masterData/company"
            }
          ]
        }
      ]
    },
    {
      groupLabel: "Setting",
      menus: [
        {
          href: "/setting",
          label: "Setting",
          active: pathname === "/setting",
          icon: Settings,
          submenus: [
            { 
              href: "/profile",
              label: "Profile",
              active: pathname === "/profile",
            }
          ]
        }
      ]
    }
  ];
}