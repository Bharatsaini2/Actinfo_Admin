import React from 'react';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CustomersTable = () => {
    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">Users</h5>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">
                                    <input type="checkbox" />
                                </th>
                                <th scope="col">Customer</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col" className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <img
                                            src="/images/user1.jpg"
                                            alt="John Doe"
                                            className="rounded-circle"
                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                        />
                                        <span>John Doe</span>
                                    </div>
                                </td>
                                <td><a href="mailto:john@example.com">john@example.com</a></td>
                                <td><a href="tel:+123456789">+123456789</a></td>
                                <td>2025-08-05</td>
                                <td>
                                    <select className="form-select form-select-sm w-auto">
                                        <option selected>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </td>
                                <td className="text-end">
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to="/customers/view" className="btn btn-sm btn-light"><FiEye /></Link>
                                        <button className="btn btn-sm btn-light"><FiEdit3 /></button>
                                        <button className="btn btn-sm btn-light text-danger"><FiTrash2 /></button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px' }}>
                                            A
                                        </div>
                                        <span>Alice Smith</span>
                                    </div>
                                </td>
                                <td><a href="mailto:alice@example.com">alice@example.com</a></td>
                                <td><a href="tel:+987654321">+987654321</a></td>
                                <td>2025-07-22</td>
                                <td>
                                    <select className="form-select form-select-sm w-auto">
                                        <option>Active</option>
                                        <option selected>Inactive</option>
                                    </select>
                                </td>
                                <td className="text-end">
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to="/customers/view" className="btn btn-sm btn-light"><FiEye /></Link>
                                        <button className="btn btn-sm btn-light"><FiEdit3 /></button>
                                        <button className="btn btn-sm btn-light text-danger"><FiTrash2 /></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Optional Pagination (static version) */}
                    <nav className="mt-3">
                        <ul className="pagination justify-content-end mb-0">
                            <li className="page-item disabled"><button className="page-link">Previous</button></li>
                            <li className="page-item active"><button className="page-link">1</button></li>
                            <li className="page-item"><button className="page-link">2</button></li>
                            <li className="page-item"><button className="page-link">3</button></li>
                            <li className="page-item"><button className="page-link">Next</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default CustomersTable;
