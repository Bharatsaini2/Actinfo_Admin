import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postData } from '../Services/api';
import JoditEditor from 'jodit-react';

const initialValues = {
  content_type: '',
  title: '',
  description: '',
};

const validationSchema = Yup.object({
  content_type: Yup.string().required('Content Type is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const CMSAddContent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await postData('/page-content', values);
      if (res) {
        toast(res.message);
        navigate('/cms/list');
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
                <h5 className="mb-0">Add CMS Page</h5>
              </div>

              <div className="card-body">
                {/* Form Fields */}
                <div className="row">
                  <div className="col-md-6 col-sm-6 mb-3">
                    <label className="form-label">Content Type</label>
                    <Field
                      type="text"
                      name="content_type"
                      className="form-control"
                      placeholder="Enter content type e.g. about_us"
                    />
                    <ErrorMessage
                      name="content_type"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
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

export default CMSAddContent;
