import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import CMSListContent from "@/components/CMS/CMSListContent";

const CMSList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/cms/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create CMS</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CMSListContent />
                </div>
            </div>
        </>
    )
}


export default CMSList