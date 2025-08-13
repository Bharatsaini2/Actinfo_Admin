import PageHeader from "@/components/shared/pageHeader/PageHeader";
import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import SubscriptionPlanListContent from "@/components/SubscriptionPlan/SubscriptionPlanListContent";

const SubscriptionPlanList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/plan/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create Subscription Plan</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SubscriptionPlanListContent />
                </div>
            </div>
        </>
    )
}


export default SubscriptionPlanList