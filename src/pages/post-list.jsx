import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import PostListContent from '@/components/PostManage/PostListContent';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
const PostList = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link to="/post/create" className="btn btn-primary">
                        <FiPlus size={16} className='me-2' />
                        <span>Create Post</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <PostListContent />
                </div>
            </div>
        </>
    )
}

export default PostList