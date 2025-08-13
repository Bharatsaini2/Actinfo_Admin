import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData, postData } from '../Services/api';

const initialValues = {
    country_id: '',
    state_name: '',
};

const validationSchema = Yup.object({
    country_id: Yup.string().required('Please Select Country'),
    state_name: Yup.string().required('State Name is required'),
});

const StateEditContent = () => {
    const { id } = useParams();
    const [formValues, setFormValues] = useState(initialValues)
    const [countryList, setcountryList] = useState([]);
    const navigate = useNavigate();
    const fetchCountries = async () => {
        try {
            const res = await getData(`/country?limit=${1000}`);
            if (res.status_code === 200) {
                setcountryList(res.data || []);
            }
        } catch (error) {
            console.log("error fetch country", error);
        }
    }
    const fetchStates = async () => {
        try {
            const res = await getData(`/state/${id}`);
            if (res.status_code === 200) {
                const data = res.data || {}
                setFormValues({
                    country_id: data.country_id || '',
                    state_name: data.state_name || '',
                })
            }
        } catch (error) {
            console.log("error fetch States", error);
        }
    }

    useEffect(() => {
        fetchStates();
    }, [id]);

    useEffect(() => {
        fetchCountries();
    }, []);
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {

            const res = await postData('/state', values);
            if (res.status_code === 200 || res.status_code === 201) {
                toast(res.message);
                navigate('/state/list');
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
                {({ isSubmitting }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Edit State</h5>
                            </div>

                            <div className="card-body">
                                {/* Form Fields */}
                                <div className="row">
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Country</label>
                                        <Field as="select" name="country_id" className="form-select" >
                                            <option value="">Select Country</option>
                                            {
                                                countryList?.map((count, index) => {
                                                    return (
                                                        <option key={count.id} value={count.id}>{count.country_name}</option>
                                                    )
                                                })
                                            }

                                        </Field>
                                        <ErrorMessage
                                            name="country_id"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">State Name</label>
                                        <Field
                                            type="text"
                                            name="state_name"
                                            className="form-control"
                                            placeholder="Enter State Name"
                                        />
                                        <ErrorMessage
                                            name="state_name"
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

export default StateEditContent;
