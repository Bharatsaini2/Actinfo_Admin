import ContestAddContent from "@/components/ContestManage/ContestAddContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CreateContests = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ContestAddContent />
                </div>
            </div>
        </>
    )
}


export default CreateContests