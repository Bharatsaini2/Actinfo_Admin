import React, { useEffect, useState } from 'react'
import { deleteData, getData, patchData } from '../Services/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SubscriptionPlanListContent = () => {
    const [planList, setPlanList] = useState([]);

    const fetchPlans = async () => {
        try {
            const res = await getData(`/subscription-plan`);
            if (res.status_code === 200) {
                setPlanList(res.data || []);
            }
        } catch (error) {
            console.log("error fetch subscription-plan", error);
        }
    };

    useEffect(() => {
        fetchPlans();
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
                    const res = await deleteData(`/subscription-plan/${catId}`,);
                    if (res.status_code === 200) {
                        toast.success(res.message);
                        await fetchPlans();
                    }
                } catch (error) {
                    console.log("error delete coupons", error)
                }
            }
        });
    }

    // const handleStatusToggle = async (postId) => {
    //     try {
    //         const response = await patchData(`/coupon/${postId}/toggle-status`);
    //         if (response.status_code === 200) {
    //             toast(response.message);
    //             await fetchPlans();
    //         }
    //     } catch (error) {
    //         toast.error(error?.response?.data?.message || "Failed to update status");
    //         console.error("Error updating coupon status", error);
    //     }
    // };

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
                                    <th scope="col">Device</th>
                                    <th scope="col">Plan Validity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Skip Advertise</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    planList?.length > 0 ? (
                                        planList?.map((plan, index) => {
                                            return (
                                                <tr key={plan.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{plan?.title}</td>
                                                    <td>{plan?.device === 0 ? "Android" : "iPhone"}</td>
                                                    <td>{plan?.plan_validity} {plan?.plan_validity_type === '1' ? 'Day' : plan?.plan_validity_type === '2' ? 'Month' : 'Year'}</td>
                                                    <td>{plan?.price}</td>
                                                    <td>{plan?.discount}</td>
                                                    <td>{plan?.skip_advertise === '1' ? 'Manuual' : plan?.skip_advertise === '2' ? 'Google' : 'Facebook'}</td>
                                                    <td>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox"
                                                                id={`flexSwitchCheck${plan.id}`}
                                                                checked={plan?.status === '1'}
                                                                // onChange={() => handleStatusToggle(plan.id)}
                                                                role="switch"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-end">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <Link to={`/plan/view/${plan.id}`} className="btn btn-sm btn-light"><FiEye /></Link>
                                                            <Link to={`/plan/update/${plan.id}`} className="btn btn-sm btn-light"><FiEdit3 /></Link>
                                                            <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(plan.id)}><FiTrash2 /></button>
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

export default SubscriptionPlanListContent