import React, { useEffect, useState } from 'react'
import { deleteData, getData, patchData } from '../Services/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CouponListContent = () => {
    const [couponList, setCouponList] = useState([]);

    const fetchCoupons = async () => {
        try {
            const res = await getData(`/coupon`);
            if (res.status_code === 200) {
                setCouponList(res.data || []);
            }
        } catch (error) {
            console.log("error fetch coupons", error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);


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
                    const res = await deleteData(`/coupon/${catId}`,);
                    if (res.status_code === 200) {
                        toast.success(res.message);
                        await fetchCoupons();
                    }
                } catch (error) {
                    console.log("error delete coupons", error)
                }
            }
        });
    }

    const handleStatusToggle = async (postId) => {
        try {
            const response = await patchData(`/coupon/${postId}/toggle-status`);
            if (response.status_code === 200) {
                toast(response.message);
                await fetchCoupons();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status");
            console.error("Error updating coupon status", error);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Coupon List</h5>
                    </div>
                    <div className="card-body table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col"> S.No. </th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Validity Type</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Coupon Type</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Coupon For</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    couponList?.length > 0 ? (
                                        couponList?.map((coupon, index) => {
                                            return (
                                                <tr key={coupon.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{coupon?.title}</td>
                                                    <td>{coupon?.code}</td>
                                                    <td>{coupon?.validity_type}</td>
                                                    <td>{coupon?.discount}</td>
                                                    <td>{coupon?.type}</td>
                                                    <td>{new Date(coupon?.start_date)?.toLocaleDateString()}</td>
                                                    <td>{new Date(coupon?.end_date)?.toLocaleDateString()}</td>
                                                    <td>{coupon?.coup_for}</td>
                                                    <td>
                                                        <span dangerouslySetInnerHTML={{ __html: coupon?.description }} />
                                                    </td>
                                                    <td>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox"
                                                                id={`flexSwitchCheck${coupon.id}`}
                                                                checked={coupon?.is_active === 'active'}
                                                                onChange={() => handleStatusToggle(coupon.id)}
                                                                role="switch"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-end">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <Link to={`/coupon/view/${coupon.id}`} className="btn btn-sm btn-light"><FiEye /></Link>
                                                            <Link to={`/coupon/update/${coupon.id}`} className="btn btn-sm btn-light"><FiEdit3 /></Link>
                                                            <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(coupon.id)}><FiTrash2 /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={10} className='text-center'>No Coupon Found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponListContent