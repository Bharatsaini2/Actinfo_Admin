import CategoryEditContent from "@/components/Settingmanage/CategoryEditContent";
import CityUpateContent from "@/components/Settingmanage/CityUpateContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";


const CityEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CityUpateContent />
                </div>
            </div>
        </>
    )
}

export default CityEdit