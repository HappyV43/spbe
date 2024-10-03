import Profile from "@/components/Profile/Profile";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Profile PKMU",
};

const ProfilePage = () => {
  return (
    <ContentLayout 
      home={"setting"} 
      mainpage={"profile"} 
      children={<Profile/>}/>
  )
};

export default ProfilePage;
