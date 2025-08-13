import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import CouponUpdateContent from '@/components/Coupons/CouponUpdateContent';

const CouponEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CouponUpdateContent />
                </div>
            </div>
        </>
    )
}

export default CouponEdit