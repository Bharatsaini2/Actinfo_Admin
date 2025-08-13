import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postData } from '../Services/api';

const initialValues = {
    age_grp: '',
    status: '',
};

const validationSchema = Yup.object({
    age_grp: Yup.string().required('Age Group is required'),
    status: Yup.string().required('Status is required'),
});

const CreateAgeGroupContent = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {

            const res = await postData('/agegroups', values);
            if (res.status_code === 200 || res.status_code === 201) {
                toast(res.message);
                navigate('/agegroup/list');
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
                {({ isSubmitting }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Add Age Group</h5>
                            </div>

                            <div className="card-body">
                                {/* Form Fields */}
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Age Group</label>
                                        <Field
                                            type="text"
                                            name="age_grp"
                                            className="form-control"
                                            placeholder="Enter Age Group e.g. 10-15"
                                        />
                                        <ErrorMessage
                                            name="age_grp"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>

                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <Field as="select" name="status" className="form-select">
                                            <option value="">Select Status</option>
                                            <option value="1">Acive</option>
                                            <option value="0">Deactive</option>
                                        </Field>
                                        <ErrorMessage
                                            name="status"
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

export default CreateAgeGroupContent;
