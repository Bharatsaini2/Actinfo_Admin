import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import AgeGroupListContent from "@/components/Settingmanage/AgeGroupListContent";

const AgeGroupList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/agegroup/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create Age Group</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <AgeGroupListContent />
                </div>
            </div>
        </>
    )
}


export default AgeGroupList