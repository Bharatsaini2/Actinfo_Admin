import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { deleteData, getData } from '../Services/api';
import Pagination from '../Services/Pagination';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const CategoryListContent = () => {
    const [catList, setCatList] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');

    const fetchCategories = async (pageNumber = page, searchQuery = search) => {
        try {
            const res = await getData(`/admin-categories?page=${pageNumber}&search=${searchQuery}`);
            if (res.status_code === 200) {
                setCatList(res.data || []);
                setPage(res.pagination.page);
                setPages(res.pagination.totalPages);
                setTotal(res.pagination.total);
            }
        } catch (error) {
            console.log("error fetch category", error);
        }
    }

    useEffect(() => {
        fetchCategories();
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
                    const res = await deleteData(`/admin-categories/${catId}`,);
                    if (res.status_code === 200) {
                        toast.success(res.message);
                        await fetchCategories();
                    }
                } catch (error) {
                    console.log("error delete category", error)
                }
            }
        });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Category</h5>
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
                                    <th scope="col">Category Icon</th>
                                    <th scope="col">Category name</th>
                                    <th scope="col">Category Type</th>
                                    <th scope="col">User Post</th>
                                    <th scope="col">Age Group</th>
                                    <th scope="col">Loaction</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Created By</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    catList?.length > 0 ? (
                                        catList?.map((cat, index) => {
                                            return (
                                                <tr key={cat.id}>
                                                    <td>{(page - 1) * 10 + index + 1}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <img
                                                                src={cat.cat_icon_image || "/images/avatar/3.png"}
                                                                alt="John Doe"
                                                                crossOrigin="anonymous"
                                                                className="rounded-circle"
                                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{cat.cat_name}</td>
                                                    <td>{cat?.cat_type === '1' ? 'UnPaid' : 'Paid'}</td>
                                                    <td>{cat?.can_user_post === '1' ? 'Allowed' : 'Not Allowed'}</td>
                                                    <td>{cat?.can_show_age_grp === '1' ? 'Show' : "Don't Show"}</td>
                                                    <td>{cat?.location_enable === '1' ? 'Enable' : "Disable"}</td>
                                                    <td>{cat?.status === '1' ? 'Active' : "Deactive"}</td>
                                                    <td>{cat?.creator?.name}</td>
                                                    <td className="text-end">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <Link to={`/categories/view/${cat.id}`} className="btn btn-sm btn-light"><FiEye /></Link>
                                                            <Link to={`/categories/update/${cat.id}`} className="btn btn-sm btn-light"><FiEdit3 /></Link>
                                                            <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(cat.id)}><FiTrash2 /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={10} className='text-center'>No Categories Found</td>
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
                        {/* <nav className="mt-3">
                            <ul className="pagination justify-content-end mb-0">
                                <li className="page-item disabled"><button className="page-link">Previous</button></li>
                                <li className="page-item active"><button className="page-link">1</button></li>
                                <li className="page-item"><button className="page-link">2</button></li>
                                <li className="page-item"><button className="page-link">3</button></li>
                                <li className="page-item"><button className="page-link">Next</button></li>
                            </ul>
                        </nav> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryListContent