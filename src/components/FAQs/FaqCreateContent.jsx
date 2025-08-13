import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postData } from '../Services/api';
import JoditEditor from 'jodit-react';

const initialValues = {
    question: '',
    description: '',
    status: '',
};

const validationSchema = Yup.object({
    question: Yup.string().required('Question is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required'),
});

const FaqCreateContent = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await postData('/faq', values);
            if (res.status_code === 200) {
                toast(res.message);
                navigate('/faq/list');
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Add FAQs</h5>
                            </div>

                            <div className="card-body">
                                {/* Form Fields */}
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Question</label>
                                        <Field
                                            type="text"
                                            name="question"
                                            className="form-control"
                                            placeholder="Enter question"
                                        />
                                        <ErrorMessage
                                            name="question"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <Field as="select" name="status" className="form-select">
                                            <option value="">Select Status</option>
                                            <option value="active">Acive</option>
                                            <option value="inactive">InActive</option>
                                        </Field>
                                        <ErrorMessage
                                            name="status"
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

export default FaqCreateContent;
