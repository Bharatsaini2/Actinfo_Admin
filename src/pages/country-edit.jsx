import CountryUpdateContent from "@/components/Settingmanage/CountryUpdateContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";


const CountryEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CountryUpdateContent />
                </div>
            </div>
        </>
    )
}

export default CountryEdit