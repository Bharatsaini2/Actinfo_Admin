import CreateCategoryContent from "@/components/Settingmanage/CreateCategoryContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CreateCategory = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CreateCategoryContent />
                </div>
            </div>
        </>
    )
}


export default CreateCategory