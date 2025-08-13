import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import SubscriptionPlanCreateContent from '@/components/SubscriptionPlan/SubscriptionPlanCreateContent';

const SubscriptonPlanCreate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SubscriptionPlanCreateContent />
                </div>
            </div>
        </>
    )
}

export default SubscriptonPlanCreate