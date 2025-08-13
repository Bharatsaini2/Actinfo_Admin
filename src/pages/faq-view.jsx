import FaqViewContent from "@/components/FAQs/FaqViewContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const FaqView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <FaqViewContent />
                </div>
            </div>
        </>
    )
}

export default FaqView