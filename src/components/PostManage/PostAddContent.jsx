// import React, { useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { FiCamera } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getData, postData } from '../Services/api';
// import JoditEditor from 'jodit-react';
// import { Select, Checkbox, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const initialValues = {
//     category_id: '',
//     gender: '',
//     state_ids: [],
//     age_group_ids: [],
//     post_type: 0,
//     images: [],
//     description: "",

// };

// const validationSchema = Yup.object({
//     category_id: Yup.string().required('Category is required'),
//     gender: Yup.string().required('Gender is required'),
//     can_user_post: Yup.string().required('Upload user post option is required'),
//     can_show_age_grp: Yup.string().required('Age group is required'),
//     status: Yup.string().required('Status is required'),
//     location_enable: Yup.string().required('Lacation is required'),
//     button_name: Yup.string().required('Button Name is required'),
//     description: Yup.string().required('Description is required'),

// });

// const PostAddContent = () => {
//     const navigate = useNavigate();
//     const [ageList, setAgeList] = useState([]);
//     const [previewImage, setPreviewImage] = useState('/images/avatar/1.png');

//     const fetchAgeGoupes = async () => {
//         try {
//             const res = await getData(`/agegroups`);
//             if (res.status_code === 200) {
//                 setAgeList(res.data || []);
//             }
//         } catch (error) {
//             console.log("error fetch age group", error);
//         }
//     }
//     const [stateList, setStateList] = useState([]);

//     const fetchStates = async () => {
//         try {
//             const res = await getData(`/state`);
//             if (res.status_code === 200) {
//                 setStateList(res.data || []);
//             }
//         } catch (error) {
//             console.log("error fetch states", error);
//         }
//     }
//     const [catList, setCatList] = useState([]);

//     const fetchCategories = async () => {
//         try {
//             const res = await getData(`/admin-categories`);
//             if (res.status_code === 200) {
//                 setCatList(res.data || []);
//             }
//         } catch (error) {
//             console.log("error fetch category", error);
//         }
//     }

//     useEffect(() => {
//         fetchCategories();
//         fetchStates();
//         fetchAgeGoupes();
//     }, []);
//     const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//         try {
//             const formData = new FormData();
//             formData.append('cat_name', values.cat_name);
//             formData.append('cat_type', values.cat_type);
//             formData.append('can_user_post', values.can_user_post);
//             formData.append('can_show_age_grp', values.can_show_age_grp);
//             formData.append('status', values.status);
//             formData.append('location_enable', values.location_enable);
//             formData.append('button_name', values.button_name);
//             formData.append('description', values.description);
//             if (values.cat_icon_image) {
//                 formData.append('cat_icon_image', values.cat_icon_image);
//             }
//             const res = await postData('/admin-categories', formData);
//             if (res.status_code === 200 || res.status_code === 201) {
//                 toast(res.message);
//                 navigate('/categories/list');
//                 resetForm();
//             }
//         } catch (error) {
//             toast.error(error.response.data.message || "error")
//         } finally {
//             setSubmitting(false);
//         }
//     }


//     return (
//         <div className="container mt-4">
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ setFieldValue, isSubmitting }) => (
//                     <Form className="w-100">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h5 className="mb-0">Add Category</h5>
//                             </div>

//                             <div className="card-body">
//                                 {/* Image Upload */}
//                                 <div className="row mb-4">
//                                     <div className="col-sm-12">
//                                         <div className="d-flex justify-content-center align-items-center flex-column">
//                                             <label className="fw-semibold">Category Icon:</label>
//                                             <label
//                                                 htmlFor="categoryIcon"
//                                                 className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded"
//                                             >
//                                                 <img
//                                                     src={previewImage}
//                                                     className="upload-pic img-fluid rounded h-100 w-100"
//                                                     alt=""
//                                                 />
//                                                 <div className="position-absolute start-50 top-50 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
//                                                     <FiCamera className="camera-icon" />
//                                                 </div>
//                                                 <input
//                                                     id="categoryIcon"
//                                                     name="cat_icon_image"
//                                                     type="file"
//                                                     hidden
//                                                     accept="image/*"
//                                                     onChange={(event) => {
//                                                         const file = event.currentTarget.files[0];
//                                                         if (file) {
//                                                             setFieldValue('cat_icon_image', file);
//                                                             setPreviewImage(URL.createObjectURL(file));
//                                                         }
//                                                     }}
//                                                 />
//                                             </label>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Form Fields */}
//                                 <div className="row">
//                                     <div className="col-sm-6 mb-3">
//                                         <label className="form-label">Select Gender</label>
//                                         <Field as="select" name="gender" className="form-select">
//                                             <option value="">Select Gender</option>
//                                             <option value="female">Female</option>
//                                             <option value="male">Male</option>
//                                         </Field>
//                                         <ErrorMessage
//                                             name="gender"
//                                             component="div"
//                                             className="text-danger fs-12 mt-1"
//                                         />
//                                     </div>
//                                     <div className="col-sm-6 mb-3">
//                                         <label className="form-label">Select States</label>
//                                         <Select
//                                             mode="multiple"
//                                             style={{ width: '100%' }}
//                                             placeholder="Select states"
//                                             onChange={(value) => setFieldValue('state_ids', value)}
//                                             options={stateList.map(state => ({
//                                                 label: state.state_name,
//                                                 value: state.id
//                                             }))}
//                                         />
//                                         <ErrorMessage name="state_ids" component="div" className="text-danger fs-12 mt-1" />
//                                     </div>

//                                     <div className="col-sm-6 mb-3">
//                                         <label className="form-label">Select Age Groups</label>
//                                         <Select
//                                             mode="multiple"
//                                             style={{ width: '100%' }}
//                                             placeholder="Select age groups"
//                                             onChange={(value) => setFieldValue('age_group_ids', value)}
//                                             options={ageList.map(age => ({
//                                                 label: age.age_grp,
//                                                 value: age.id
//                                             }))}
//                                         />
//                                         <ErrorMessage name="age_group_ids" component="div" className="text-danger fs-12 mt-1" />
//                                     </div>

//                                     <div className="col-sm-6 mb-3">
//                                         <label className="form-label">Category</label>
//                                         <Field as="select" name="status" className="form-select">
//                                             <option value="">Select Category</option>
//                                             {
//                                                 catList?.map((cat, index) => {
//                                                     return (
//                                                         <option key={cat.id} value={cat.id}>{cat.cat_name}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Field>
//                                         <ErrorMessage
//                                             name="status"
//                                             component="div"
//                                             className="text-danger fs-12 mt-1"
//                                         />
//                                     </div>
//                                     <div className="col-md-12 mb-3">
//                                         <label className="form-label">Post Type</label>
//                                         <Checkbox.Group
//                                             options={[
//                                                 { label: 'None', value: 0 },
//                                                 { label: 'Image', value: 1 },
//                                                 { label: 'Video', value: 2 }
//                                             ]}
//                                             value={[initialValues.post_type]} // keep single value as array
//                                             onChange={(checkedValues) => {
//                                                 // Allow only one selection
//                                                 const selected = checkedValues.length > 0 ? checkedValues[checkedValues.length - 1] : 0;
//                                                 setFieldValue('post_type', selected);
//                                             }}
//                                         />
//                                     </div>
//                                     {initialValues.post_type === 1 && (
//                                         <div className="col-md-12 mb-3">
//                                             <label className="form-label">Upload Images</label>
//                                             <Upload
//                                                 multiple
//                                                 listType="picture"
//                                                 accept="image/*"
//                                                 beforeUpload={() => false}
//                                                 onChange={({ fileList }) => setFieldValue('images', fileList.map(f => f.originFileObj))}
//                                             >
//                                                 <button className="btn btn-outline-primary" icon={<UploadOutlined />}>
//                                                     Upload Images
//                                                 </button>
//                                             </Upload>
//                                         </div>
//                                     )}

//                                     {initialValues.post_type === 2 && (
//                                         <div className="col-md-12 mb-3">
//                                             <label className="form-label">Upload Videos</label>
//                                             <Upload
//                                                 multiple
//                                                 listType="text"
//                                                 accept="video/*"
//                                                 beforeUpload={() => false}
//                                                 onChange={({ fileList }) => setFieldValue('images', fileList.map(f => f.originFileObj))}
//                                             >
//                                                 <button className="btn btn-outline-primary" icon={<UploadOutlined />}>
//                                                     Upload Videos
//                                                 </button>
//                                             </Upload>
//                                         </div>
//                                     )}

//                                     <div className="col-md-12 mb-3">
//                                         <label className="form-label">Description</label>
//                                         <Field name="description">
//                                             {({ field, form }) => (
//                                                 <JoditEditor
//                                                     value={field.value}
//                                                     onBlur={newContent => form.setFieldValue("description", newContent)}
//                                                 />
//                                             )}
//                                         </Field>
//                                         <ErrorMessage
//                                             name="description"
//                                             component="div"
//                                             className="text-danger fs-12 mt-1"
//                                         />
//                                     </div>

//                                 </div>

//                                 {/* Submit */}
//                                 <div className="text-end d-flex justify-content-end mt-4">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary"
//                                         disabled={isSubmitting}
//                                     >
//                                         {isSubmitting ? 'Saving...' : 'Save'}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default PostAddContent;

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData, postData } from '../Services/api';
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
    images: Yup.array()
        .of(Yup.mixed())
        .min(1, 'At least one image is required'),
});

const PostAddContent = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();

            // Append only allowed fields
            formData.append('category_id', values.category_id);
            formData.append('gender', values.gender);
            formData.append('description', values.description);
            // ✅ Append each state ID individually
            values.state_ids.forEach(id => {
                formData.append('state_ids[]', Number(id));  // or parseInt(id)
            });

            // ✅ Append each age group ID individually
            values.age_group_ids.forEach(id => {
                formData.append('age_group_ids[]', Number(id));
            });

            // Optional images array
            if (values.images && values.images.length > 0) {
                values.images.forEach(file => {
                    formData.append('images', file);
                });
            }

            // Optional icon image
            if (values.cat_icon_image) {
                formData.append('cat_icon_image', values.cat_icon_image);
            }

            // ✅ Now submit using FormData
            const res = await postData('/user-post', formData, {
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting, values }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Add Post</h5>
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
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">Upload Images</label>
                                            <Upload
                                                multiple
                                                listType="picture"
                                                accept="image/*"
                                                beforeUpload={() => false}
                                                onChange={({ fileList }) => {
                                                    const files = fileList.map(f => f.originFileObj);
                                                    setFieldValue('images', files);
                                                }}
                                            >
                                                <button className="btn btn-outline-primary" icon={<UploadOutlined />}>
                                                    Upload Images
                                                </button>
                                            </Upload>
                                        </div>
                                    )}
                                    {values.post_type === 2 && (
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">Upload Videos</label>
                                            <Upload
                                                multiple
                                                listType="text"
                                                accept="video/*"
                                                beforeUpload={() => false}
                                                onChange={({ fileList }) => {
                                                    const files = fileList.map(f => f.originFileObj);
                                                    setFieldValue('images', files);
                                                }}
                                            >
                                                <button className="btn btn-outline-primary" icon={<UploadOutlined />}>
                                                    Upload Videos
                                                </button>
                                            </Upload>
                                        </div>
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

export default PostAddContent;

