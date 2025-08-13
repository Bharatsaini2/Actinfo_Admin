import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import StateAddContent from '@/components/Settingmanage/StateAddContent';

const StateCreate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <StateAddContent />
                </div>
            </div>
        </>
    )
}

export default StateCreate