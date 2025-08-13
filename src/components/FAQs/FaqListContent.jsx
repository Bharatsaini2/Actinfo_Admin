import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../Services/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const FaqListContent = () => {
    const [faqList, setFaqList] = useState([]);

    const fetchFaqs = async () => {
        try {
            const res = await getData(`/faq`);
            if (res.status_code === 200) {
                setFaqList(res.data || []);
            }
        } catch (error) {
            console.log("error fetch faq", error);
        }
    };

    useEffect(() => {
        fetchFaqs();
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
                    const res = await deleteData(`/faq/${catId}`,);
                    if (res.status_code === 200) {
                        toast.success(res.message);
                        await fetchFaqs();
                    }
                } catch (error) {
                    console.log("error delete faq", error)
                }
            }
        });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">FAQ List</h5>
                    </div>
                    <div className="card-body table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col"> S.No. </th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    faqList?.length > 0 ? (
                                        faqList?.map((faq, index) => {
                                            return (
                                                <tr key={faq.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{faq?.question}</td>
                                                    <td> <span dangerouslySetInnerHTML={{ __html: faq?.description?.slice(0, 100) }} /></td>
                                                    <td>{faq?.status}</td>
                                                    <td className="text-end">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <Link to={`/faq/view/${faq.id}`} className="btn btn-sm btn-light"><FiEye /></Link>
                                                            <Link to={`/faq/update/${faq.id}`} className="btn btn-sm btn-light"><FiEdit3 /></Link>
                                                            <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(faq.id)}><FiTrash2 /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className='text-center'>No FAQ Found</td>
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

export default FaqListContent