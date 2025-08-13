import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData, postData, putData } from '../Services/api';

const initialValues = {
    country_id: '',
    state_id: '',
    city_name: '',
};

const validationSchema = Yup.object({
    country_id: Yup.string().required('Please Select Country'),
    state_id: Yup.string().required('Please Select State'),
    city_name: Yup.string().required('City Name is required'),
});

const CityUpateContent = () => {
    const { id } = useParams();
    const [countryList, setCountryList] = useState([]);
    const [formValues, setFormValues] = useState(initialValues);
    const [stateList, setStateList] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const navigate = useNavigate();

    // Fetch all countries on mount
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const res = await getData(`/country?limit=1000`);
            if (res.status_code === 200) {
                setCountryList(res.data || []);
            }
        } catch (error) {
            console.log("Error fetching countries", error);
        }
    };

    const fetchCities = async () => {
        try {
            const res = await getData(`/city/${id}`);
            if (res.status_code === 200) {
                const data = res.data || {}
                setFormValues({
                    country_id: data.country_id || '',
                    state_id: data.state_id || '',
                    city_name: data.city_name || '',
                })
                const selectedCountry = countryList.find(c => c.id == data.country_id);
                if (selectedCountry?.country_code) {
                    await fetchStatesByCode(selectedCountry.country_code);
                }

                setSelectedCountryId(data.country_id); // ✅ Set only after states loaded
            }
        } catch (error) {
            console.log("error fetch City", error);
        }
    }
    useEffect(() => {
        fetchCities();
    }, [id])
    const fetchStatesByCode = async (countryCode) => {
        try {
            const res = await postData(`/user-auth/state-get`, { country_code: countryCode });
            if (res.status_code === 200) {
                setStateList(res.data || []);
            } else {
                setStateList([]);
            }
        } catch (error) {
            console.log("Error fetching states", error);
            setStateList([]);
        }
    };

    // Fetch states whenever selectedCountryId changes
    useEffect(() => {
        const selectedCountry = countryList?.find(c => c.id == selectedCountryId);
        if (selectedCountry?.country_code) {
            fetchStatesByCode(selectedCountry.country_code);
        } else {
            setStateList([]);
        }
    }, [selectedCountryId]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await putData(`/city/${id}`, values);
            if (res.status_code === 200 || res.status_code === 201) {
                toast.success(res.message || "City added successfully!");
                resetForm();
                navigate('/city/list');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add city");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Edit City</h5>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    {/* Country Dropdown */}
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Country</label>
                                        <Field
                                            as="select"
                                            name="country_id"
                                            className="form-select"
                                            onChange={(e) => {
                                                const selectedId = e.target.value;
                                                console.log(selectedId)
                                                setFieldValue('country_id', selectedId);
                                                setFieldValue('state_id', '');
                                                setSelectedCountryId(selectedId); // ✅ trigger useEffect
                                            }}
                                        >
                                            <option value="">Select Country</option>
                                            {countryList?.map((country) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.country_name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="country_id"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>

                                    {/* State Dropdown */}
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">State</label>
                                        <Field as="select" name="state_id" className="form-select">
                                            <option value="">Select State</option>
                                            {stateList?.length > 0
                                                ? stateList.map((state) => (
                                                    <option key={state.id} value={state.id}>
                                                        {state.state_name}
                                                    </option>
                                                ))
                                                : <option disabled>No States Found</option>
                                            }
                                        </Field>
                                        <ErrorMessage
                                            name="state_id"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>

                                    {/* City Name Field */}
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">City Name</label>
                                        <Field
                                            type="text"
                                            name="city_name"
                                            className="form-control"
                                            placeholder="Enter City Name"
                                        />
                                        <ErrorMessage
                                            name="city_name"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
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

export default CityUpateContent;

