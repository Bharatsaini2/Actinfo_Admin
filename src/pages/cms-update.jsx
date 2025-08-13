import CMSUpdateContent from "@/components/CMS/CMSUpdateContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";


const CMSEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CMSUpdateContent />
                </div>
            </div>
        </>
    )
}

export default CMSEdit