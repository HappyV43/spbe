"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartArea,
  Command,
  Database,
  Frame,
  GalleryVerticalEnd,
  House,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../ui/sidebar"
import Image from "next/image"
import { Button } from "../ui/button"
import { toast } from "@/hooks/use-toast"
import { logOut } from "@/app/actions/auth.actions"
import { LogoutSidebar } from "./LogoutSidebar"
import { MainSidebar } from "./MainSidebar"
import { SummarySidebar } from "./SummarySidebar"
import { MasterSidebar } from "./MasterSidebar"

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  summary: [
    {
      name: "Summary",
      url: "/summary",
      icon: ChartArea,
    },
  ],
  dashboard: [
    {
      title: "Dashboard",
      url: "/dashboard/penyaluran-elpiji",
      icon: House,
      isActive: true,
      items: [
        {
          title: "Alokasi Harian",
          url: "/dashboard/alokasi-harian",
        },
        {
          title: "Penyaluran Elpiji",
          url: "/dashboard/penyaluran-elpiji",
        },
        {
          title: "Alokasi Bulanan",
          url: "/dashboard/alokasi-bulanan",
        },
      ],
    },
  ],
  masterData: [
    {
      title: "Master Data",
      url: "/master-data/agents",
      icon: Database,
      // isActive: true,
      items: [
        {
          title: "Agen",
          url: "/master-data/agents",
        },
        {
          title: "Perusahaan",
          url: "/master-data/companies",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const handleClick = async () => {
        const result = await logOut();
        if (result?.error) {
          toast({
            title: "Gagal",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Logout berhasil",
          });
        }
      };
    
    return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center">
        <Image src="/icon.svg" width={125} height={125} alt="Icon PKMU" />
      </SidebarHeader>
      <SidebarContent>
        <SummarySidebar items={data.summary}/>
        <MainSidebar items={data.dashboard}/>
        <MasterSidebar items={data.masterData}/>
      </SidebarContent>
      <SidebarFooter>
        <LogoutSidebar onLogout={handleClick}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

