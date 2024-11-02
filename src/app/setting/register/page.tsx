import SignUpForm from "@/app/auth/login/register";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Register PKMU",
};

const RegisterPage = () => {
  return (
    <ContentLayout
      home={"setting"}
      mainpage={"register"}
      children={<SignUpForm />}
    />
  );
};

export default RegisterPage;
