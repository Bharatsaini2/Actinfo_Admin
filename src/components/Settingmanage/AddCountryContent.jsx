import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postData } from '../Services/api';

const initialValues = {
  country_code: '',
  country_name: '',
};

const validationSchema = Yup.object({
  country_code: Yup.string().required('country Code is required'),
  country_name: Yup.string().required('Country Name is required'),
});

const AddCountryContent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {

      const res = await postData('/country', values);
      if (res.status_code === 200 || res.status_code === 201) {
        toast(res.message);
        navigate('/country/list');
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
                <h5 className="mb-0">Add Country</h5>
              </div>

              <div className="card-body">
                {/* Form Fields */}
                <div className="row">
                  <div className="col-md-6 col-sm-6 mb-3">
                    <label className="form-label">Country Code</label>
                    <Field
                      type="text"
                      name="country_code"
                      className="form-control"
                      placeholder="Enter Country Code"
                    />
                    <ErrorMessage
                      name="country_code"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-6 col-sm-6 mb-3">
                    <label className="form-label">Country Name</label>
                    <Field
                      type="text"
                      name="country_name"
                      className="form-control"
                      placeholder="Enter Country Name"
                    />
                    <ErrorMessage
                      name="country_name"
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

export default AddCountryContent;
