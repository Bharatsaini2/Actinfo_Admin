import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData, putData } from '../Services/api';
import JoditEditor from 'jodit-react';
import { Select, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const initialValues = {
  category_id: '',
  gender: '',
  state_ids: [],
  age_group_ids: [],
  post_type: 0,
  images: [],
  description: "",
};

const validationSchema = Yup.object({
  category_id: Yup.string().required('Category is required'),
  gender: Yup.string().required('Gender is required'),
  description: Yup.string().required('Description is required'),
  state_ids: Yup.array()
    .of(Yup.number().typeError('State ID must be a number'))
    .min(1, 'At least one state must be selected')
    .required('State is required'),

  age_group_ids: Yup.array()
    .of(Yup.number().typeError('Age Group ID must be a number'))
    .min(1, 'At least one age group must be selected')
    .required('Age group is required'),
});

const PostEditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [ageList, setAgeList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchStates();
    fetchAgeGroups();
  }, []);

  const fetchAgeGroups = async () => {
    try {
      const res = await getData(`/agegroups`);
      if (res.status_code === 200) {
        setAgeList(res.data || []);
      }
    } catch (error) {
      console.log("error fetch age group", error);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await getData(`/state`);
      if (res.status_code === 200) {
        setStateList(res.data || []);
      }
    } catch (error) {
      console.log("error fetch states", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getData(`/admin-categories`);
      if (res.status_code === 200) {
        setCatList(res.data || []);
      }
    } catch (error) {
      console.log("error fetch category", error);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await getData(`/admin-post/${id}`);
      console.log(res)
      if (res.status_code === 200) {
        const post = res.data?.[0];

        const mappedValues = {
          category_id: post.category_id || '',
          gender: post.gender || '',
          description: post.description || '',
          post_type: post.PostImages?.[0]?.post_type || 0,
          state_ids: post.PostSelectedStates?.map(s => s.state_id) || [],
          age_group_ids: post.PostAgeGroups?.map(a => a.age_group_id) || [],
          images: [], // Empty, user must re-upload if editing
          previewImages: post.PostImages?.map(i => i.file_path) || [],
        };

        setInitialFormValues(mappedValues);
      }
    } catch (error) {
      console.log("error fetch category", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("clicked")
    try {
      const formData = new FormData();

      // Append only allowed fields
      formData.append('category_id', values.category_id);
      formData.append('gender', values.gender);
      formData.append('description', values.description);
      values.state_ids.forEach(id => {
        formData.append('state_ids[]', Number(id));  // or parseInt(id)
      });

      values.age_group_ids.forEach(id => {
        formData.append('age_group_ids[]', Number(id));
      });
      if (values.images && values.images.length > 0) {
        values.images.forEach(file => {
          formData.append('images', file);
        });
      }
      if (values.cat_icon_image) {
        formData.append('cat_icon_image', values.cat_icon_image);
      }
      const res = await putData(`/user-post/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status_code === 200 || res.status_code === 201) {
        toast.success(res.message || "Post created successfully!");
        navigate('/post/list');
        resetForm();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="w-100">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Edit Post</h5>
              </div>

              <div className="card-body">
                <div className="row">
                  {/* Gender */}
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Select Gender</label>
                    <Field as="select" name="gender" className="form-select">
                      <option value="">Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-danger fs-12 mt-1" />
                  </div>

                  {/* State Multi Select */}
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Select States</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%', height: "48px" }}
                      placeholder="Select states"
                      value={values.state_ids}
                      onChange={(val) => setFieldValue('state_ids', val)}
                      options={stateList.map(state => ({
                        label: state.state_name,
                        value: state.id
                      }))}
                    />
                    <ErrorMessage name="state_ids" component="div" className="text-danger fs-12 mt-1" />
                  </div>

                  {/* Age Group Multi Select */}
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Select Age Groups</label>
                    <Select
                      mode="multiple"
                      style={{ width: '100%', height: "48px" }}
                      placeholder="Select age groups"
                      value={values.age_group_ids}
                      onChange={(val) => setFieldValue('age_group_ids', val)}
                      options={ageList.map(age => ({
                        label: age.age_grp,
                        value: age.id
                      }))}
                    />
                    <ErrorMessage name="age_group_ids" component="div" className="text-danger fs-12 mt-1" />
                  </div>

                  {/* Category */}
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Category</label>
                    <Field as="select" name="category_id" className="form-select">
                      <option value="">Select Category</option>
                      {catList.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.cat_name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="category_id" component="div" className="text-danger fs-12 mt-1" />
                  </div>

                  {/* Post Type Selector */}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Post Type</label><br />
                    <Checkbox.Group
                      options={[
                        { label: 'None', value: 0 },
                        { label: 'Image', value: 1 },
                        { label: 'Video', value: 2 }
                      ]}
                      value={[values.post_type]}
                      onChange={(checkedValues) => {
                        const selected = checkedValues.length > 0 ? checkedValues[checkedValues.length - 1] : 0;
                        setFieldValue('post_type', selected);
                      }}
                    />
                  </div>

                  {/* Conditional Upload Fields */}
                  {values.post_type === 1 && (
                    <>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Uploaded Images</label>
                        <div className="d-flex gap-3 flex-wrap">
                          {values.previewImages?.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`post-img-${i}`}
                              crossOrigin="anonymous"
                              className="rounded border"
                              style={{ width: 100, height: 100, objectFit: 'cover' }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Upload New Images</label>
                        <Upload
                          multiple
                          listType="picture"
                          accept="image/*"
                          beforeUpload={() => false}
                          crossOrigin="anonymous"
                          onChange={({ fileList }) => {
                            const files = fileList.map(f => f.originFileObj);
                            setFieldValue('images', files);
                          }}
                        >
                          <button className="btn btn-outline-primary" type='button' icon={<UploadOutlined />}>
                            Upload Images
                          </button>
                        </Upload>
                      </div>
                    </>
                  )}

                  {/* Description */}
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
                    <ErrorMessage name="description" component="div" className="text-danger fs-12 mt-1" />
                  </div>
                </div>

                <div className="text-end d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting} >
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

export default PostEditContent;

