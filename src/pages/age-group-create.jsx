import CreateAgeGroupContent from "@/components/Settingmanage/CreateAgeGroupContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CreateAgeGroup = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CreateAgeGroupContent />
                </div>
            </div>
        </>
    )
}


export default CreateAgeGroup