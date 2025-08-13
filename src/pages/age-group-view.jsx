import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import AgeGroupViewContent from '@/components/Settingmanage/AgeGroupViewContent';

const AgeGroupView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <AgeGroupViewContent />
                </div>
            </div>
        </>
    )
}

export default AgeGroupView