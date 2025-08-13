import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import StateListContent from "@/components/Settingmanage/StateListContent";

const StateList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/state/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create State</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <StateListContent />
                </div>
            </div>
        </>
    )
}


export default StateList