import CategoryEditContent from "@/components/Settingmanage/CategoryEditContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";


const CategoryEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CategoryEditContent />
                </div>
            </div>
        </>
    )
}

export default CategoryEdit