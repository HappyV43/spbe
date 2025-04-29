import { redirect } from "next/navigation";
import { getCurrentSession } from "../actions/auth.actions";
import Summary from "@/components/Screens/Summary/Summary";
import {
  allDataDefault,
  getSummaryToday,
  getWeeklySummaryDefault,
  getAnnualSummaryData,
} from "../actions/summary.action";

export const metadata = {
  title: "Data Summary PKMU",
};

const SummaryPage = async () => {
  const sessionData = await getCurrentSession();
  const { session, user } = sessionData;

  if (!session || !user) {
    redirect("/auth/login");
  }

  const [summaryData, weekly, annually, allData] = await Promise.all([
    getSummaryToday(user.id),
    getWeeklySummaryDefault(user.id),
    getAnnualSummaryData(user.id),
    allDataDefault(user.id),
  ]);

  return (
    // <ContentLayout
    //   home={"summary"}
    //   children={
    <>
      <Summary
        defaultdata={summaryData}
        weekly={weekly}
        annually={annually}
        allData={allData}
        user={user}
      />
    </>

    // }
    // />
  );
};

export default SummaryPage;
