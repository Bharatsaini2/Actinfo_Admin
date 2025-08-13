import ContestUpdateContent from "@/components/ContestManage/ContestUpdateContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const ContestsUpdate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ContestUpdateContent />
                </div>
            </div>
        </>
    )
}


export default ContestsUpdate