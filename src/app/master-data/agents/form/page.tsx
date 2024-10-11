import { ContentLayout } from '@/components/ContentLayout';
import Form from '@/components/FormComponent/Form';
import React from 'react'

export const metadata = {
    title: "Form PKMU",
  };

const FormAgentsPage = () => {
    return (
        <ContentLayout  
        home={"master-data"}
        mainpage={"agents"}
        childpage={"form"}
        children={<Form page={'agents'}/>}
   />
    )
}

export default FormAgentsPage
