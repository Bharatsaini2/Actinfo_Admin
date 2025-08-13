import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../Services/api';
import Swal from 'sweetalert2';
import Pagination from '../Services/Pagination';
import { Link } from 'react-router-dom';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CountryListContent = () => {
    const [countryList, setCountryList] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');

    const fetchCountries = async (pageNumber = page, searchQuery = search) => {
        try {
            const res = await getData(`/country?page=${pageNumber}&search=${searchQuery}`);
            if (res.status_code === 200) {
                setCountryList(res.data || []);
                setPage(res.pagination.currentPage);
                setPages(res.pagination.totalPages);
                setTotal(res.pagination.totalItems);
            }
        } catch (error) {
            console.log("error fetch countries", error);
        }
    }

    useEffect(() => {
        fetchCountries();
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
                    const res = await deleteData(`/country/${catId}`,);
                    if (res.status_code === 200) {
                        toast.success(res.message);
                        await fetchCountries();
                    }
                } catch (error) {
                    console.log("error delete countries", error)
                }
            }
        });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Country List</h5>
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
                                    <th scope="col">Country Code</th>
                                    <th scope="col">Country Name</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    countryList?.length > 0 ? (
                                        countryList?.map((age, index) => {
                                            return (
                                                <tr key={age.id}>
                                                    <td>{(page - 1) * 10 + index + 1}</td>
                                                    <td>{age?.country_code}</td>
                                                    <td>{age?.country_name}</td>
                                                    {/* <td>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={age?.status} role="switch" id="flexSwitchCheckDefault" />
                                                        </div>
                                                    </td> */}
                                                    <td className="text-end">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <Link to={`/country/view/${age.id}`} className="btn btn-sm btn-light"><FiEye /></Link>
                                                            <Link to={`/country/update/${age.id}`} className="btn btn-sm btn-light"><FiEdit3 /></Link>
                                                            <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(age.id)}><FiTrash2 /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className='text-center'>No Countries Found</td>
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

export default CountryListContent