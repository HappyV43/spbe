import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PTAgen from "@/components/PTAgen/PTAgen";

export const metadata = {
  title: "Penyaluran Elpiji PKMU",
};

const PTAgenPage = () => {
    return (
        <DefaultLayout>
            <PTAgen/>
        </DefaultLayout>
    );
};

export default PTAgenPage;
