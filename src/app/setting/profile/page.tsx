import Profile from "@/components/Profile/Profile";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Profile PKMU",
};

const ProfilePage = () => {
  return <ContentLayout title={"Master Data"} subtitle={"Agen"} children={<Profile/>}/>
};

export default ProfilePage;
