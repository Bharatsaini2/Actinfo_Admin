import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import CategoryListContent from "@/components/Settingmanage/CategoryListContent";

const CategoryList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/categories/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create Category</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CategoryListContent />
                </div>
            </div>
        </>
    )
}


export default CategoryList