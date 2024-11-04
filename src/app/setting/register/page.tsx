import { getCurrentSession } from "@/app/actions/auth.actions";
import SignUpForm from "@/app/auth/login/register";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Register PKMU",
};

const RegisterPage = async () => {
  const { user } = await getCurrentSession();
  const role = user?.role || "USER";
  return (
    <ContentLayout
      home={"setting"}
      mainpage={"register"}
      children={<SignUpForm role={role} />}
    />
  );
};

export default RegisterPage;
