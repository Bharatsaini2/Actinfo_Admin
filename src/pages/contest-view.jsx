import ContestViewContent from "@/components/ContestManage/ContestViewContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const ContestsView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <ContestViewContent />
                </div>
            </div>
        </>
    )
}


export default ContestsView