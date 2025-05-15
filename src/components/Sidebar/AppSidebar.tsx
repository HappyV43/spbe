"use client";

import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { logOut } from "@/app/actions/auth.actions";
import { LogoutSidebar } from "./LogoutSidebar";
import { MainSidebar } from "./MainSidebar";
import { SummarySidebar } from "./SummarySidebar";
import { MasterSidebar } from "./MasterSidebar";
import { sidebarItems } from "@/constants/sidebarItems.constant";
import { User } from "../../../generated/prisma_client/default";

export function AppSidebar({
  user,
  image,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: any; image: string }) {
  const handleClick = async () => {
    const result = await logOut();
    if (result?.error) {
      toast({
        title: "Gagal",
        description: result.error,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Logout berhasil",
        duration: 1500,
      });
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center">
        {user?.companiesId == 1 ? (
          <Image src={image} width={130} height={130} alt="Icon PKMU" />
        ) : user?.companiesId == 2 ? (
          <Image src={image} width={150} height={150} alt="Icon SMG" />
        ) : null}
      </SidebarHeader>
      <SidebarContent>
        <SummarySidebar items={sidebarItems.summary} />
        <MainSidebar items={sidebarItems.dashboard} />
        <MasterSidebar items={sidebarItems.masterData} />
      </SidebarContent>
      <SidebarFooter>
        <LogoutSidebar onLogout={handleClick} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
