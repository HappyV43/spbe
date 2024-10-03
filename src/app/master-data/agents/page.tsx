import Agents from "@/components/Agents/Agents";
import { ContentLayout } from "@/components/ContentLayout";
import { agentColumns } from "@/lib/Column";
import { dataAgents } from "@/lib/DataAgents";

export const metadata = {
  title: "Agents PKMU",
};

const AgentsPage = () => {
    return (
      <ContentLayout
        home={"master-data"} 
        mainpage={"agents"} 
        children={<Agents columns={agentColumns} data={dataAgents}/>}/>
    )
};

export default AgentsPage;
