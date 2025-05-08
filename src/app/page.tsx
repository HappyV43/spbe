// import { AppSidebar } from "@/components/Sidebar/AppSidebar";
// import {
//   SidebarProvider,
//   SidebarInset,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { getCurrentSession } from "./actions/auth.actions";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

// // const page = async () => {

// // export default page;

// export default async function Page() {
//   const cookieStore = cookies();
//   const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
//   const dataUser = await getCurrentSession();
//   console.log(dataUser, "ARDINE");
//   // if (!dataUser.session && !dataUser.user) {
//   //   redirect("/auth/login");
//   // } else {
//   //   <SidebarProvider defaultOpen={defaultOpen}>
//   //     <AppSidebar user={dataUser.user} />
//   //   </SidebarProvider>;
//   // }
//   if (!dataUser.session && !dataUser.user) {
//     redirect("/auth/login");
//   }

//   return (
//     <SidebarProvider defaultOpen={defaultOpen}>
//       <AppSidebar user={dataUser.user} />
//     </SidebarProvider>
//   );
// }
