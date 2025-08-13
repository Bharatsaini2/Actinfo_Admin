import AgeGroupEditContent from "@/components/Settingmanage/AgeGroupEditContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";


const AgeGroupEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <AgeGroupEditContent />
                </div>
            </div>
        </>
    )
}

export default AgeGroupEdit