import DefaultLayout from "@/components/Sidebar/DefaultLayout";
import React from "react";

export default function Home({
  children
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
