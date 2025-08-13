import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import SubscriptionPlanViewContent from '@/components/SubscriptionPlan/SubscriptionPlanViewContent';

const SubscriptonPlanView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SubscriptionPlanViewContent />
                </div>
            </div>
        </>
    )
}

export default SubscriptonPlanView