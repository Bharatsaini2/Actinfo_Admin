import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import PostViewContent from '@/components/PostManage/PostViewContent';

const PostView = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <PostViewContent />
                </div>
            </div>
        </>
    )
}

export default PostView