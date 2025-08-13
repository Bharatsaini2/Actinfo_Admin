import CMSViewContent from "@/components/CMS/CMSViewContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CMSView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CMSViewContent />
                </div>
            </div>
        </>
    )
}

export default CMSView