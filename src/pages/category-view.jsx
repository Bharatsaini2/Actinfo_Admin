import CategoryViewContent from "@/components/Settingmanage/CategoryViewContent";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";

const CategoryView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CategoryViewContent />
                </div>
            </div>
        </>
    )
}

export default CategoryView