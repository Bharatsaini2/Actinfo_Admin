import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import PostAddContent from '@/components/PostManage/PostAddContent';

const PostCreate = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <PostAddContent />
                </div>
            </div>
        </>
    )
}

export default PostCreate