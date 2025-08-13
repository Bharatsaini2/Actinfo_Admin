import StateEditContent from "@/components/Settingmanage/StateEditContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";


const StateEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <StateEditContent />
                </div>
            </div>
        </>
    )
}

export default StateEdit