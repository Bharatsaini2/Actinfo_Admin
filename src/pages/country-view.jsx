import CountryViewContent from "@/components/Settingmanage/CountryViewContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CountryView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CountryViewContent />
                </div>
            </div>
        </>
    )
}

export default CountryView