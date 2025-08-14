import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postData } from '../Services/api';
import JoditEditor from 'jodit-react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Select } from "antd";
const { Option } = Select;

const initialValues = {
    title: "",
    cont_type: "",
    amount: "",
    no_of_winner: "",
    highlight: "",
    is_active: "",
    upload_media_type: "",
    reg_start_datetime: "",
    reg_end_datetime: "",
    cont_start_datetime: "",
    cont_end_datetime: "",
    cont_and_voting_start_datetime: "",
    cont_and_voting_end_datetime: "",
    cont_result_declare: "",
    vote_system: "",
    winner_cmnt: "",
    result_declaration: "",
    home_screen_result_show: "",
    sponsers_detail: "",
    short_description: "",
    cont_instru: "",
    cont_benefit: "",
    cont_guideline: "",
    cont_t_and_c: "",
    cont_banner_img: "",
    sponsers: [{ spon_name: "", spon_cmp_name: "", spon_img: null }]
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    cont_type: Yup.string().required('Contest Type is required'),
    amount: Yup.string().required('Amount is required'),
    no_of_winner: Yup.string().required('No. of winner is required'),
    highlight: Yup.string().required('Highlight is required.'),
    is_active: Yup.string().required('Status is required'),
    upload_media_type: Yup.string().required('Please Select Media Type'),
    reg_start_datetime: Yup.string().required('Regestration Start Date Time is required'),
    reg_end_datetime: Yup.string().required('Regestration End Date Time is required'),
    cont_start_datetime: Yup.string().required('Contest Start Date Time is required'),
    cont_end_datetime: Yup.string().required('Contest End Date Time is required'),
    cont_and_voting_start_datetime: Yup.string().required('Contest & Voting Start Date Time is required'),
    cont_and_voting_end_datetime: Yup.string().required('Contest & Voting End Date Time is required'),
    cont_result_declare: Yup.string().required('Contest Result Date is required'),
    vote_system: Yup.string().required('Vote System is required'),
    winner_cmnt: Yup.string().required('Please Select Winners Comment'),
    result_declaration: Yup.string().required('Please Select Access Result Declaration'),
    home_screen_result_show: Yup.string().required('Please Select Home Screen Result Show'),
    short_description: Yup.string().required('Short Description is required'),
    cont_instru: Yup.string().required('Contest Instruction is required'),
    cont_benefit: Yup.string().required('Contest Benifit is required'),
    cont_guideline: Yup.string().required('Contest Guideline is required'),
    cont_t_and_c: Yup.string().required('Contest T & C is required'),
    cont_banner_img: Yup.string().required('Contest Banner Image is required'),
    sponsers_detail: Yup.string().required('Please Select Sponsers Detail'),
});

const ContestAddContent = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            const res = await postData('/contest', values);
            if (res.status_code === 200 || res.status_code === 201) {
                toast(res.message);
                navigate('/plan/list');
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
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="w-100">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Add Contest</h5>
                            </div>

                            <div className="card-body">
                                {/* Form Fields */}
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Contest Title</label>
                                        <Field
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            placeholder="Enter Contest title"
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Contest Type</label>
                                        <Field as="select" name="cont_type" className="form-select">
                                            <option value="">Select Contest Type</option>
                                            <option value="1">Free</option>
                                            <option value="2">Paid</option>
                                        </Field>
                                        <ErrorMessage
                                            name="cont_type"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Amount</label>
                                        <Field
                                            type="text"
                                            name="amount"
                                            className="form-control"
                                            placeholder="Enter amount"
                                        />
                                        <ErrorMessage
                                            name="amount"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">No.of Winner</label>
                                        <Field
                                            type="text"
                                            name="no_of_winner"
                                            className="form-control"
                                            placeholder="Enter no_of_winner"
                                        />
                                        <ErrorMessage
                                            name="no_of_winner"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Highlight</label>
                                        <Field as="select" name="highlight" className="form-select">
                                            <option value="">Select Highlight</option>
                                            <option value="1">On</option>
                                            <option value="0">Off</option>
                                        </Field>
                                        <ErrorMessage
                                            name="highlight"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <Field as="select" name="is_active" className="form-select">
                                            <option value="">Select Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Deactive</option>
                                        </Field>
                                        <ErrorMessage
                                            name="is_active"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Upload Media Type</label>
                                        <Field as="select" name="upload_media_type" className="form-select">
                                            <option value="">Select Media Type</option>
                                            <option value="1">Link</option>
                                            <option value="2">Image</option>
                                            <option value="3">Video</option>
                                        </Field>
                                        <ErrorMessage
                                            name="upload_media_type"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Registration Start Date/Time</label>
                                        <Field
                                            type="text"
                                            name="reg_start_datetime"
                                            className="form-control"
                                            placeholder="Enter reg_start_datetime"
                                        />
                                        <ErrorMessage
                                            name="reg_start_datetime"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Registration End Date/Time</label>
                                        <Field
                                            type="text"
                                            name="reg_end_datetime"
                                            className="form-control"
                                            placeholder="Enter reg_end_datetime"
                                        />
                                        <ErrorMessage
                                            name="reg_end_datetime"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>

                                    {values.vote_system === "1" ? (
                                        <>
                                            <div className="col-md-6 col-sm-6 mb-3">
                                                <label className="form-label">Contest & Voting Start Date/Time</label>
                                                <Field
                                                    type="text"
                                                    name="cont_and_voting_start_datetime"
                                                    className="form-control"
                                                    placeholder="Enter cont_and_voting_start_datetime"
                                                />
                                                <ErrorMessage
                                                    name="cont_and_voting_start_datetime"
                                                    component="div"
                                                    className="text-danger fs-12 mt-1"
                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 mb-3">
                                                <label className="form-label">Contest & Voting End Date/Time</label>
                                                <Field
                                                    type="text"
                                                    name="cont_and_voting_end_datetime"
                                                    className="form-control"
                                                    placeholder="Enter cont_and_voting_end_datetime"
                                                />
                                                <ErrorMessage
                                                    name="cont_and_voting_end_datetime"
                                                    component="div"
                                                    className="text-danger fs-12 mt-1"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-md-6 col-sm-6 mb-3">
                                                <label className="form-label">Contest Start Date/Time</label>
                                                <Field
                                                    type="text"
                                                    name="cont_start_datetime"
                                                    className="form-control"
                                                    placeholder="Enter cont_start_datetime"
                                                />
                                                <ErrorMessage
                                                    name="cont_start_datetime"
                                                    component="div"
                                                    className="text-danger fs-12 mt-1"
                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 mb-3">
                                                <label className="form-label">Contest End Date/Time</label>
                                                <Field
                                                    type="text"
                                                    name="cont_end_datetime"
                                                    className="form-control"
                                                    placeholder="Enter cont_end_datetime"
                                                />
                                                <ErrorMessage
                                                    name="cont_end_datetime"
                                                    component="div"
                                                    className="text-danger fs-12 mt-1"
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className="col-md-6 col-sm-6 mb-3">
                                        <label className="form-label">Contest Result Date/Time</label>
                                        <Field
                                            type="text"
                                            name="cont_result_declare"
                                            className="form-control"
                                            placeholder="Enter cont_result_declare"
                                        />
                                        <ErrorMessage
                                            name="cont_result_declare"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Voting System</label>
                                        <div className="form-check form-switch">
                                            <Field
                                                type="checkbox"
                                                name="vote_system"
                                                className="form-check-input"
                                                checked={values.vote_system === "1"}
                                                onChange={(e) =>
                                                    setFieldValue("vote_system", e.target.checked ? "1" : "2")
                                                }
                                            />
                                            <label className="form-check-label">
                                                {values.vote_system === "1" ? "Enable Voting" : "Disable Voting"}
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            name="vote_system"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Winner Comment</label>
                                        <div className="form-check form-switch">
                                            <Field
                                                type="checkbox"
                                                name="winner_cmnt"
                                                className="form-check-input"
                                                checked={values.winner_cmnt === "1"}
                                                onChange={(e) =>
                                                    setFieldValue("winner_cmnt", e.target.checked ? "1" : "2")
                                                }
                                            />
                                            <label className="form-check-label">
                                                {values.winner_cmnt === "1" ? "Enable Winner Comment" : "Disable Winner Comment"}
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            name="winner_cmnt"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Result Declaration</label>
                                          <div className="form-check form-switch">
                                            <Field
                                                type="checkbox"
                                                name="result_declaration"
                                                className="form-check-input"
                                                checked={values.result_declaration === "1"}
                                                onChange={(e) =>
                                                    setFieldValue("result_declaration", e.target.checked ? "1" : "2")
                                                }
                                            />
                                            <label className="form-check-label">
                                                {values.result_declaration === "1" ? "Auto" : "Manual"}
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            name="result_declaration"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Home Screen Result</label>
                                         <div className="form-check form-switch">
                                            <Field
                                                type="checkbox"
                                                name="home_screen_result_show"
                                                className="form-check-input"
                                                checked={values.home_screen_result_show === "1"}
                                                onChange={(e) =>
                                                    setFieldValue("home_screen_result_show", e.target.checked ? "1" : "2")
                                                }
                                            />
                                            <label className="form-check-label">
                                                {values.home_screen_result_show === "1" ? "Show" : "Hide"}
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            name="home_screen_result_show"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Sponsers Details</label>
                                          <div className="form-check form-switch">
                                            <Field
                                                type="checkbox"
                                                name="sponsers_detail"
                                                className="form-check-input"
                                                checked={values.sponsers_detail === "1"}
                                                onChange={(e) =>
                                                    setFieldValue("sponsers_detail", e.target.checked ? "1" : "2")
                                                }
                                            />
                                            <label className="form-check-label">
                                                {values.sponsers_detail === "1" ? "Show" : "Hide"}
                                            </label>
                                        </div>
                                        <ErrorMessage
                                            name="sponsers_detail"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    {values.sponsers_detail === "1" && (
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">Sponsors</label>

                                            <FieldArray name="sponsers">
                                                {({ push, remove }) => (
                                                    <div>
                                                        {values.sponsers.map((sponser, index) => (
                                                            <div key={index} className="row mb-3 border p-3 rounded">
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Sponsor Name</label>
                                                                    <Field
                                                                        type="text"
                                                                        name={`sponsers[${index}].spon_name`}
                                                                        className="form-control"
                                                                        placeholder="Enter sponsor name"
                                                                    />
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <label className="form-label">Company Name</label>
                                                                    <Field
                                                                        type="text"
                                                                        name={`sponsers[${index}].spon_cmp_name`}
                                                                        className="form-control"
                                                                        placeholder="Enter company name"
                                                                    />
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <label className="form-label">Sponsor Image</label>
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        onChange={(event) =>
                                                                            setFieldValue(
                                                                                `sponsers[${index}].spon_img`,
                                                                                event.currentTarget.files[0]
                                                                            )
                                                                        }
                                                                    />
                                                                    {values.sponsers[index].spon_img && (
                                                                        <div className="mt-2">
                                                                            <img
                                                                                src={
                                                                                    typeof values.sponsers[index].spon_img === "string"
                                                                                        ? values.sponsers[index].spon_img // existing URL from DB
                                                                                        : URL.createObjectURL(values.sponsers[index].spon_img) // new file preview
                                                                                }
                                                                                alt="Sponsor Preview"
                                                                                className="img-thumbnail"
                                                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="col-md-1 d-flex align-items-end">
                                                                    {values.sponsers.length > 1 && (
                                                                        <AiOutlineMinusCircle
                                                                            size={24}
                                                                            className="text-danger cursor-pointer"
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* Add More Sponsor Button */}
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary d-flex align-items-center"
                                                            onClick={() => push({ spon_name: "", spon_cmp_name: "", spon_img: null })}
                                                        >
                                                            <AiOutlinePlusCircle className="me-1" /> Add More Sponsor
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                    )}

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Contest Banner Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0];
                                                if (file) {
                                                    setFieldValue('cont_banner_img', file);
                                                    setPreviewImage(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Short Description</label>
                                        <Field name="short_description">
                                            {({ field, form }) => (
                                                <JoditEditor
                                                    value={field.value}
                                                    onBlur={newContent => form.setFieldValue("short_description", newContent)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="short_description"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Contest Instruction</label>
                                        <Field name="cont_instru">
                                            {({ field, form }) => (
                                                <JoditEditor
                                                    value={field.value}
                                                    onBlur={newContent => form.setFieldValue("cont_instru", newContent)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="cont_instru"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Contest Benifits</label>
                                        <Field name="cont_benefit">
                                            {({ field, form }) => (
                                                <JoditEditor
                                                    value={field.value}
                                                    onBlur={newContent => form.setFieldValue("cont_benefit", newContent)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="cont_benefit"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Contest Guideline</label>
                                        <Field name="cont_guideline">
                                            {({ field, form }) => (
                                                <JoditEditor
                                                    value={field.value}
                                                    onBlur={newContent => form.setFieldValue("cont_guideline", newContent)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="cont_guideline"
                                            component="div"
                                            className="text-danger fs-12 mt-1"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Contest Terms & Condition</label>
                                        <Field name="cont_t_and_c">
                                            {({ field, form }) => (
                                                <JoditEditor
                                                    value={field.value}
                                                    onBlur={newContent => form.setFieldValue("cont_t_and_c", newContent)}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="cont_t_and_c"
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

export default ContestAddContent;
