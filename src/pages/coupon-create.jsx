import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import CouponCreateContent from '@/components/Coupons/CouponCreateContent';

const CouponCreate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CouponCreateContent />
                </div>
            </div>
        </>
    )
}

export default CouponCreate