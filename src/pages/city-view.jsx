import CityViewContent from "@/components/Settingmanage/CityViewContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CityView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CityViewContent />
                </div>
            </div>
        </>
    )
}

export default CityView