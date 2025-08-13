import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import CityListContent from "@/components/Settingmanage/CityListContent";

const CityList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/city/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create City</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CityListContent />
                </div>
            </div>
        </>
    )
}


export default CityList