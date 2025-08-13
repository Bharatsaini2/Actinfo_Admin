import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import Footer from '@/components/shared/Footer';
import FaqListContent from '@/components/FAQs/FaqListContent';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'

const FaqList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/faq/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create FAQ</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <FaqListContent />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FaqList