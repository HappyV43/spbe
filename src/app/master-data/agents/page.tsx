import { getAgentsAll } from "@/app/actions/agent.action";
import Agents from "@/components/Agents/Agents";
import { ContentLayout } from "@/components/ContentLayout";
import { agentColumns } from "@/lib/Column";

export const metadata = {
  title: "Agents PKMU",
};

const AgentsPage = async () => {
  const data = await getAgentsAll();
  return (
    <ContentLayout
      home={"master-data"}
      mainpage={"agents"}
      children={<Agents columns={agentColumns} data={data} />}
    />
  );
};

export default AgentsPage;
