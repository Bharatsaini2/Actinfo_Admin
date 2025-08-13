import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postData } from '../Services/api';
import JoditEditor from 'jodit-react';

const initialValues = {
    title: '',
    code: '',
    validity_type: '',
    description: '',
    discount: "",
    type: "",
    start_date: "",
    end_date: "",
    created_by: "",
    coup_for: "",
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    code: Yup.string().required('Code is required'),
    validity_type: Yup.string().required('validity Type is required'),
    description: Yup.string().required('Description is required'),
    discount: Yup.string().required('Discount is required'),
    type: Yup.string().required('Coupon Type is required'),
    start_date: Yup.string().required('Start Date is required'),
    end_date: Yup.string().required('End Date is required'),
    created_by: Yup.string().required('Created By is required'),
    coup_for: Yup.string().required('Coupon For is required'),
});

const CouponCreateContent = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await postData('/coupon', values);
            if (res.status_code === 200 || res.status_code === 201) {
                toast(res.message);
                navigate('/coupon/list');
                resetForm();
            }
        } catch (error) {
            toast.error(error.response.data.message || error.response.data.error)
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className="container mt-4">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Add Coupon</h5>
                            </div>

                            <div className="card-body">
                                {/* Form Fields */}
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Title</label>
                                        <Field
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            placeholder="Enter title"
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Code</label>
                                        <Field
                                            type="text"
                                            name="code"
                                            className="form-control"
                                            placeholder="Enter code"
                                        />
                                        <ErrorMessage
                                            name="code"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Discount</label>
                                        <Field name="discount"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter discount"
                                        />
                                        <ErrorMessage
                                            name="discount"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Validity Type</label>
                                        <Field as="select" name="validity_type" className="form-select">
                                            <option value="">Select Validity Type</option>
                                            <option value="limited">Limited</option>
                                            <option value="unlimited">Unlimited</option>
                                        </Field>
                                        <ErrorMessage
                                            name="validity_type"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Type</label>
                                        <Field as="select" name="type" className="form-select">
                                            <option value="">Select Coupon Type</option>
                                            <option value="upto">Upto</option>
                                            <option value="flat">Flat</option>
                                            <option value="percentage">Percentage</option>
                                        </Field>
                                        <ErrorMessage
                                            name="type"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Start Date</label>
                                        <Field name="start_date"
                                            type="date"
                                            className="form-control"
                                            placeholder="Enter Start Date"
                                        />
                                        <ErrorMessage
                                            name="start_date"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">End Date</label>
                                        <Field name="end_date"
                                            type="date"
                                            className="form-control"
                                            placeholder="Enter Start Date"
                                        />
                                        <ErrorMessage
                                            name="end_date"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Created By</label>
                                        <Field name="created_by"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Created By e.g. 1"
                                        />
                                        <ErrorMessage
                                            name="created_by"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Coupon For</label>
                                        <Field as="select" name="coup_for" className="form-select">
                                            <option value="">Select Coupon For</option>
                                            <option value="subscription plan">Subscription Plan</option>
                                            <option value="live class">Live Class</option>
                                            <option value="acting course">Acting Course</option>
                                        </Field>
                                        <ErrorMessage
                                            name="coup_for"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Description</label>
                                        <Field name="description">
                                            {({ field, form }) => (
                                                <JoditEditor
                                                    value={field.value}
                                                    onBlur={newContent => form.setFieldValue("description", newContent)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                </div>
                                {/* Submit */}
                                <div className="text-end d-flex justify-content-end mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CouponCreateContent;
