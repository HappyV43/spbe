import { ContentLayout } from "@/components/ContentLayout";
import Register from "@/components/Register/Register";

export const metadata = {
  title: "Register PKMU",
};

const RegisterPage = () => {
  return (
    <ContentLayout 
      home={"setting"} 
      mainpage={"register"} 
      children={<Register/>}/>
  )
};

export default RegisterPage;
