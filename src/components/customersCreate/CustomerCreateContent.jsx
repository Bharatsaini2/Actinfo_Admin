import React from 'react'
import { FiCamera } from 'react-icons/fi'
const CustomerCreateContent = () => {
    return (
        <>
            <div className="container mt-4">    
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Add Users</h5>
                    </div>
                    <div className="card-body">
                        <h6 className="mb-3">Personal Information</h6>

                        {/* Avatar Upload */}
                        <div className="row mb-4 align-items-center">
                            <div className="col-sm-2">
                                <label className="fw-semibold">Avatar: </label>
                            </div>
                            <div className="col-lg-10">
                                <div className="mb-4 mb-md-0 d-flex gap-4 your-brand">
                                    <label htmlFor='img' className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
                                        <img src="/images/avatar/1.png" className="upload-pic img-fluid rounded h-100 w-100" alt="" />
                                        <div className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
                                            <i aria-hidden="true" className='camera-icon'><FiCamera /></i>
                                        </div>
                                        <input className="file-upload" type="file" accept="image/*" id='img' hidden />
                                    </label>
                                    <div className="d-flex flex-column gap-1">
                                        <div className="fs-11 text-gray-500 mt-2"># Upload your prifile</div>
                                        <div className="fs-11 text-gray-500"># Avatar size 150x150</div>
                                        <div className="fs-11 text-gray-500"># Max upload size 2mb</div>
                                        <div className="fs-11 text-gray-500"># Allowed file types: png, jpg, jpeg</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Personal Fields */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Full Name" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" placeholder="Email Address" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input type="tel" className="form-control" placeholder="Phone Number" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Company</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Company Name" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Designation</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Designation" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Website</label>
                            <div className="col-sm-10">
                                <input type="url" className="form-control" placeholder="Website URL" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">VAT</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="VAT Number" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Address</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="2" placeholder="Full Address"></textarea>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <label className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="3" placeholder="Short Description"></textarea>
                            </div>
                        </div>

                        <hr />

                        <h6 className="mb-3">Additional Information</h6>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Date of Birth</label>
                            <div className="col-sm-10">
                                <input type="date" className="form-control" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Country</label>
                            <div className="col-sm-10">
                                <select className="form-select">
                                    <option value="">Select Country</option>
                                    <option value="india">India</option>
                                    <option value="usa">USA</option>
                                    <option value="uk">UK</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">State</label>
                            <div className="col-sm-10">
                                <select className="form-select">
                                    <option value="">Select State</option>
                                    <option value="rajasthan">Rajasthan</option>
                                    <option value="new-york">New York</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">City</label>
                            <div className="col-sm-10">
                                <select className="form-select">
                                    <option value="">Select City</option>
                                    <option value="jaipur">Jaipur</option>
                                    <option value="nyc">New York City</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <label className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-10">
                                <select className="form-select">
                                    <option value="active" selected>Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-end">
                            <button className="btn btn-primary">Save Customer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerCreateContent