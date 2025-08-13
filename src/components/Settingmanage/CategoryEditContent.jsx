import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiCamera } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData, putData } from '../Services/api';
import JoditEditor from 'jodit-react';

const initialValues = {
    cat_name: '',
    cat_type: '',
    can_user_post: '',
    can_show_age_grp: '',
    status: '',
    location_enable: '',
    button_name: '',
    message_template: '',
    cat_icon_image: null,
};

const validationSchema = Yup.object({
    cat_name: Yup.string().required('Category name is required'),
    cat_type: Yup.string().required('Category type is required'),
    can_user_post: Yup.string().required('Upload user post option is required'),
    can_show_age_grp: Yup.string().required('Age group is required'),
    status: Yup.string().required('Status is required'),
    location_enable: Yup.string().required('Lacation is required'),
    button_name: Yup.string().required('Button Name is required'),
    message_template: Yup.string().required('Message template is required'),
});

const CategoryEditContent = () => {
    const { id } = useParams();
    const [formValues, setFormValues] = useState(initialValues);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const res = await getData(`/admin-categories/${id}`);
            if (res.status_code === 200) {
                const data = res.data || {}
                setFormValues({
                    cat_name: data.cat_name || '',
                    cat_type: data.cat_type || '',
                    can_user_post: data.can_user_post || '',
                    can_show_age_grp: data.can_show_age_grp || '',
                    status: data.status || '',
                    location_enable: data.location_enable || '',
                    button_name: data.button_name || '',
                    message_template: data.message_template || '',
                    cat_icon_image: data.cat_icon_image || null,
                });
            }
        } catch (error) {
            console.log("error fetch category", error);
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormValues((prev) => ({
            ...prev,
            cat_icon_image: file
        }))
    }
    useEffect(() => {
        fetchCategories();
    }, [id]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append('cat_name', values.cat_name);
            formData.append('cat_type', values.cat_type);
            formData.append('can_user_post', values.can_user_post);
            formData.append('can_show_age_grp', values.can_show_age_grp);
            formData.append('status', values.status);
            formData.append('location_enable', values.location_enable);
            formData.append('button_name', values.button_name);
            formData.append('message_template', values.message_template);
            if (values.cat_icon_image && typeof values.cat_icon_image !== 'string') {
                formData.append('cat_icon_image', values.cat_icon_image);
            }

            const res = await putData(`/admin-categories/${id}`, formData);
            if (res.status_code === 200 || res.status_code === 201) {
                toast(res.message);
                navigate('/categories/list');
                resetForm();
            }
        } catch (error) {
            toast.error(error.response.data.message || "error")
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className="container mt-4">
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Edit Category</h5>
                            </div>

                            <div className="card-body">
                                {/* Image Upload */}
                                <div className="row mb-4">
                                    <div className="col-sm-12">
                                        <div className="d-flex justify-content-center align-items-center flex-column">
                                            <label className="fw-semibold">Category Icon:</label>
                                            <label
                                                htmlFor="categoryIcon"
                                                className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded"
                                            >
                                                <img
                                                    src={
                                                        formValues.cat_icon_image
                                                            ? typeof formValues.cat_icon_image === 'string'
                                                                ? `${formValues.cat_icon_image}`
                                                                : URL.createObjectURL(formValues.cat_icon_image)
                                                            : '/images/avatar/1.png'
                                                    }
                                                    className="upload-pic img-fluid rounded h-100 w-100"
                                                    alt=""
                                                    crossOrigin="anonymous"
                                                />
                                                <div className="position-absolute start-50 top-50 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
                                                    <FiCamera className="camera-icon" />
                                                </div>
                                                <input
                                                    id="categoryIcon"
                                                    name="cat_icon_image"
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Category Name</label>
                                        <Field
                                            type="text"
                                            name="cat_name"
                                            className="form-control"
                                            placeholder="Category Name"
                                        />
                                        <ErrorMessage
                                            name="cat_name"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Category Type</label>
                                        <Field as="select" name="cat_type" className="form-select">
                                            <option value="">Select Category Type</option>
                                            <option value="1">Unpaid</option>
                                            <option value="2">Paid</option>
                                        </Field>
                                        <ErrorMessage
                                            name="cat_type"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>

                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Upload User Post</label>
                                        <Field as="select" name="can_user_post" className="form-select">
                                            <option value="">Select User Post</option>
                                            <option value="1">Allowed</option>
                                            <option value="2">Not Allowed</option>
                                        </Field>
                                        <ErrorMessage
                                            name="can_user_post"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>

                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Age Group</label>
                                        <Field as="select" name="can_show_age_grp" className="form-select">
                                            <option value="">Select Age Group</option>
                                            <option value="1">Show</option>
                                            <option value="2">Don't Show</option>
                                        </Field>
                                        <ErrorMessage
                                            name="can_show_age_grp"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <Field as="select" name="status" className="form-select">
                                            <option value="">Select Status</option>
                                            <option value="1">Acive</option>
                                            <option value="2">Deactive</option>
                                        </Field>
                                        <ErrorMessage
                                            name="status"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Location Enable</label>
                                        <Field as="select" name="location_enable" className="form-select">
                                            <option value="">Select Location</option>
                                            <option value="1">Enable</option>
                                            <option value="2">Disable</option>
                                        </Field>
                                        <ErrorMessage
                                            name="location_enable"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-3">
                                        <label className="form-label">Button Name</label>
                                        <Field
                                            type="text"
                                            name="button_name"
                                            className="form-control"
                                            placeholder="Button Name"
                                        />
                                        <ErrorMessage
                                            name="button_name"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Message Template</label>
                                        <Field name="message_template">
                                            {({ field, form }) => (
                                                <JoditEditor
                                                    value={field.value}
                                                    onBlur={newContent => form.setFieldValue("message_template", newContent)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="message_template"
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
                                        {isSubmitting ? 'Saving...' : 'Save Category'}
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

export default CategoryEditContent;
