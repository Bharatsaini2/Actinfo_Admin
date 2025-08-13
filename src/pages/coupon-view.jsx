import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import CouponViewContent from '@/components/Coupons/CouponViewContent';

const CouponView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CouponViewContent />
                </div>
            </div>
        </>
    )
}

export default CouponView