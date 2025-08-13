import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import AddCityContent from '@/components/Settingmanage/AddCityContent';

const CityCreate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <AddCityContent />
                </div>
            </div>
        </>
    )
}

export default CityCreate