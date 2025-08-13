import StateViewContent from "@/components/Settingmanage/StateViewContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const StateView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <StateViewContent />
                </div>
            </div>
        </>
    )
}

export default StateView