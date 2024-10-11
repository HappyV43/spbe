import { ContentLayout } from '@/components/ContentLayout';
import Form from '@/components/FormComponent/Form';
import React from 'react'

export const metadata = {
    title: "Form PKMU",
  };

const FormLpgPage = () => {
    return (
         <ContentLayout  
             home={"dashboard"}
             mainpage={"penyaluran-elpiji"}
             childpage={"form"}
             children={<Form page={"distribution"}/>}
        />
    )
}

export default FormLpgPage
