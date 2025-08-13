import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import Footer from '@/components/shared/Footer';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'
import CouponListContent from '@/components/Coupons/CouponListContent';

const CouponList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/coupon/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create Coupon</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CouponListContent />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CouponList