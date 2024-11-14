import { redirect } from "next/navigation";
import { getCurrentSession } from "../actions/auth.actions";
import { getAllLpg } from "../actions/lpg-distribution.action";
import { ContentLayout } from "@/components/ContentLayout";
import Summary from "@/components/Screens/Summary/Summary";


export const metadata = {
    title: "Data Summary PKMU",
  };

 const SummaryPage = async () => {
    const data = await getAllLpg();
    const { session, user } = await getCurrentSession();
    if (!session && !user) {
      redirect("/auth/login");
    }
    return (
        <ContentLayout
            home={"summary"}
            children={
                <Summary
                    data={data} 
                />
            }
        />
    );
 };

 export default SummaryPage;
