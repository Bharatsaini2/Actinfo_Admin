import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { deleteData, getData, patchData } from '../Services/api';
import Pagination from '../Services/Pagination';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const PostListContent = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const fetchPosts = async (pageNumber = page, searchQuery = search) => {
    try {
      const res = await getData(`/admin-post?page=${pageNumber}&search=${searchQuery}`);
      if (res.status_code === 200) {
        setPostList(res.data || []);
        setPage(res.page || 1);
        setPages(res.totalPages);
        setTotal(res.total);
      }
    } catch (error) {
      console.log("error fetch post", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== page) {
      setPage(pageNumber);
    }
  };

  const handleDelete = (catId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteData(`/admin-post/${catId}`,);
          if (res.status_code === 200) {
            toast.success(res.message);
            await fetchPosts();
          }
        } catch (error) {
          console.log("error delete post", error)
        }
      }
    });
  }
  const handlePublishToggle = async (postId, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 2 : 1; // 1 = publish, 2 = unpublish

      const response = await patchData(`/admin-post/${postId}/publish-status`, {
        post_publish_status: newStatus,
      });

      if (response.status_code === 200) {
        toast(response.message);
        await fetchPosts();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
      console.error("Error updating post status", error);
    }
  };
  const handlePostVerifyStatus = async (postId, currentStatus) => {
    try {
      const response = await patchData(`/admin-post/${postId}/status`, {
        status: currentStatus,
      });

      if (response.status_code === 200) {
        toast(response.message);
        await fetchPosts();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
      console.error("Error updating post status", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Post List</h5>
            <div>
              <input type='search' placeholder='search here...'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }} />
            </div>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th scope="col"> S.No. </th>
                  <th scope="col">Post Date & Time</th>
                  <th scope="col">Category</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Age Group</th>
                  <th scope="col">State</th>
                  <th scope="col">Verify Status</th>
                  <th scope="col">Publish Status</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  postList?.length > 0 ? (
                    postList?.map((cat, index) => {
                      return (
                        <tr key={cat.id}>
                          <td>{(page - 1) * 10 + index + 1}</td>
                          <td>
                            {dayjs(cat?.createdAt).format("D MMMM YYYY | h:mm A")}
                          </td>
                          <td>{cat.category_name}</td>
                          <td>{cat?.gender}</td>
                          <td>
                            {cat?.PostAgeGroups?.map(age => `${age.age_grp} Year`).join(', ')}
                          </td>
                          <td>
                            {cat?.PostSelectedStates?.map(state => `${state.state_name}`).join(', ')}
                          </td>
                          <td>
                            <select className="form-select"
                              value={cat.status}
                              onChange={(e) => handlePostVerifyStatus(cat.id, parseInt(e.target.value))}
                            >
                              <option value="0">Pending</option>
                              <option value="1">Verify</option>
                              <option value="2">Reject</option>
                              <option value="3">ReSubmit</option>
                            </select>
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox"
                                id={`flexSwitchCheck${cat.id}`}
                                checked={cat?.post_publish_status === 1}
                                onChange={() => handlePublishToggle(cat.id, cat?.post_publish_status)}
                                role="switch"
                              />
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <Link to={`/post/view/${cat.id}`} className="btn btn-sm btn-light"><FiEye /></Link>
                              <Link to={`/post/update/${cat.id}`} className="btn btn-sm btn-light"><FiEdit3 /></Link>
                              <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(cat.id)}><FiTrash2 /></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={10} className='text-center'>No Posts Found</td>
                    </tr>
                  )
                }

              </tbody>
            </table>

            {/* Optional Pagination (static version) */}
            <div className='d-flex justify-content-between align-items-center p-2'>
              <div className="text-muted">
                Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} entries
              </div>
              <Pagination
                page={page}
                pages={pages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostListContent