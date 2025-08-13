import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import CMSAddContent from '@/components/CMS/CMSAddContent';

const CmsCreate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <CMSAddContent />
                </div>
            </div>
        </>
    )
}

export default CmsCreate