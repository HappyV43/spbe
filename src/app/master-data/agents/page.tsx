import { getAgentsAll } from "@/app/actions/agent.action";
import { getCurrentSession } from "@/app/actions/auth.actions";
import Agents from "@/components/Agents/Agents";
import { ContentLayout } from "@/components/ContentLayout";
import { agentColumns } from "@/lib/Column";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Agents PKMU",
};

const AgentsPage = async () => {
  const data = await getAgentsAll();
  const dataUser = await getCurrentSession();
  if (!dataUser.session && !dataUser.user) {
    redirect("/auth/login");
  }
  return (
    <ContentLayout
      home={"master-data"}
      mainpage={"agents"}
      children={<Agents columns={agentColumns} data={data} />}
    />
  );
};

export default AgentsPage;
