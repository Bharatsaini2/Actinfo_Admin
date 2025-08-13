import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import PostEditContent from '@/components/PostManage/PostEditContent';

const PostEdit = () => {
    return (
        <>
            <PageHeader>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <PostEditContent />
                </div>
            </div>
        </>
    )
}

export default PostEdit