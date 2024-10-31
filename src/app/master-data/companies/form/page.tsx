import { ContentLayout } from '@/components/ContentLayout';
import Form from '@/components/FormComponent/Form';
import React from 'react'

export const metadata = {
    title: "Form PKMU",
  };

const FormCompanyPage = () => {
    return (
        <ContentLayout  
             home={"master-data"}
             mainpage={"companies"}
             childpage={"form"}
             children={<Form page={"companies"}/>}
        />
    )
}

export default FormCompanyPage
