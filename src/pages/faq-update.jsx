import FaqUpdateContent from "@/components/FAQs/FaqUpdateContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";


const FaqEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <FaqUpdateContent />
                </div>
            </div>
        </>
    )
}

export default FaqEdit