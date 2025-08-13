import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import SubscriptionPlanUpdateContent from '@/components/SubscriptionPlan/SubscriptionPlanUpdateContent';

const SubscriptonPlanUpdate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SubscriptionPlanUpdateContent />
                </div>
            </div>
        </>
    )
}

export default SubscriptonPlanUpdate