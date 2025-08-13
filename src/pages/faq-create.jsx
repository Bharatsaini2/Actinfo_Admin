import FaqCreateContent from "@/components/FAQs/FaqCreateContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CreateFaq = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <FaqCreateContent />
                </div>
            </div>
        </>
    )
}


export default CreateFaq