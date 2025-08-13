import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData, putData } from '../Services/api';
import JoditEditor from 'jodit-react';
import { Select } from "antd";
const { Option } = Select;

const initialValues = {
  device: "",
  title: "",
  plan_validity: "",
  plan_validity_type: "",
  price: "",
  discount: "",
  // description:"",
  plan_included_categories: "",
  skip_advertise: "",
  status: "",
  unlimited_daily_alerts: "",
  access_monologue_scripts: "",
  pinup_fav_alert_categories: "",
  unlimited_posts: "",
  personalized_alerts: "",
  ads_free_platform: "",
  state_based_updates: "",
  unlock_filter_options: "",
  live_workshop_enrollment: "",
};

const validationSchema = Yup.object({
  device: Yup.string().required('Device Plan is required'),
  title: Yup.string().required('Title is required'),
  plan_validity: Yup.string().required('Plan validity is required'),
  plan_validity_type: Yup.string().required('Plan validity Type is required'),
  price: Yup.string().required('Price is required'),
  discount: Yup.string().required('Discount is required'),
  // description: Yup.string().required('Description is required'),
  plan_included_categories: Yup.string().required('Add Categories is required'),
  skip_advertise: Yup.string().required('Skip Advertise is required'),
  status: Yup.string().required('Status is required'),
  unlimited_daily_alerts: Yup.string().required('Please Select Daily Alerts'),
  access_monologue_scripts: Yup.string().required('Please Select Access Monologue Scripts'),
  pinup_fav_alert_categories: Yup.string().required('Please Select Alert Categories'),
  unlimited_posts: Yup.string().required('Please Select Unlimited Posts'),
  personalized_alerts: Yup.string().required('Please Select Personalized Alerts'),
  ads_free_platform: Yup.string().required('Please Select Ads Free Platform'),
  state_based_updates: Yup.string().required('Please Select State Based Updates'),
  unlock_filter_options: Yup.string().required('Please Select Filter Options'),
  live_workshop_enrollment: Yup.string().required('Please Select Workshop Enrollment'),
});

const SubscriptionPlanUpdateContent = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState(initialValues)
  const navigate = useNavigate();

  const fetchPlans = async () => {
    try {
      const res = await getData(`/subscription-plan/${id}`);
      if (res.status_code === 200) {
        const data = res.plan || {};
        setFormValues({
          device: data.device || "",
          title: data.title || "",
          plan_validity: data.plan_validity || "",
          plan_validity_type: data.plan_validity_type || "",
          price: data.price || "",
          discount: data.discount || "",
          plan_included_categories: data.plan_included_categories || "",
          skip_advertise: data.skip_advertise || "",
          status: data.status || "",
          unlimited_daily_alerts: data.unlimited_daily_alerts || "",
          access_monologue_scripts: data.access_monologue_scripts || "",
          pinup_fav_alert_categories: data.pinup_fav_alert_categories || "",
          unlimited_posts: data.unlimited_posts || "",
          personalized_alerts: data.personalized_alerts || "",
          ads_free_platform: data.ads_free_platform || "",
          state_based_updates: data.state_based_updates || "",
          unlock_filter_options: data.unlock_filter_options || "",
          live_workshop_enrollment: data.live_workshop_enrollment || "",
        });
      }
    } catch (error) {
      console.log("error fetch subscription-plan", error);
    }
  }

  useEffect(() => {
    fetchPlans();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await putData(`/subscription-plan/${id}`, values);
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
        enableReinitialize
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="w-100">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Edit Subscription Plan</h5>
              </div>

              <div className="card-body">
                {/* Form Fields */}
                <div className="row">
                  <div className="col-md-6 col-sm-6 mb-3">
                    <label className="form-label">Subscription Title</label>
                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter Subscription title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Plan Validity</label>
                    <Field name="plan_validity"
                      type="text"
                      className="form-control"
                      placeholder="Enter plan validity e.g. 1 2 etc."
                    />
                    <ErrorMessage
                      name="plan_validity"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Plan Validity Type</label>
                    <Field as="select" name="plan_validity_type" className="form-select">
                      <option value="">Select Plan Validity Type</option>
                      <option value="1">Day</option>
                      <option value="2">Month</option>
                      <option value="3">Year</option>
                    </Field>
                    <ErrorMessage
                      name="plan_validity_type"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-6 col-sm-6 mb-3">
                    <label className="form-label">Price</label>
                    <Field
                      type="text"
                      name="price"
                      className="form-control"
                      placeholder="Enter price"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-6 col-sm-6 mb-3">
                    <label className="form-label">Discount</label>
                    <Field
                      type="text"
                      name="discount"
                      className="form-control"
                      placeholder="Enter discount"
                    />
                    <ErrorMessage
                      name="discount"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Add Categories</label>
                    <Field name="plan_included_categories">
                      {({ field, form }) => (
                        <Select
                          mode="multiple"
                          placeholder="Select Categories"
                          value={field.value ? field.value.split(",") : []} // convert CSV -> array
                          onChange={(value) => form.setFieldValue(field.name, value.join(","))} // array -> CSV
                          style={{ width: "100%", height: "50px" }}
                        >
                          <Option value="1">Upload Audition</Option>
                          <Option value="2">Monologue Script</Option>
                          <Option value="3">Acting Profile</Option>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="plan_included_categories"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Device Plan</label>
                    <Field as="select" name="device" className="form-select">
                      <option value="">Select Device</option>
                      <option value="0">Android</option>
                      <option value="1">iPhone</option>
                    </Field>
                    <ErrorMessage
                      name="device"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Skip Advertise</label>
                    <Field as="select" name="skip_advertise" className="form-select">
                      <option value="">Select Advertise Type</option>
                      <option value="1">Manuual</option>
                      <option value="2">Google</option>
                      <option value="3">Facebook</option>
                    </Field>
                    <ErrorMessage
                      name="skip_advertise"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <Field as="select" name="status" className="form-select">
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Deactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Unlimited Daily Alerts</label>
                    <Field as="select" name="unlimited_daily_alerts" className="form-select">
                      <option value="">Select Daily Alerts</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="unlimited_daily_alerts"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Access Monologue Scripts</label>
                    <Field as="select" name="access_monologue_scripts" className="form-select">
                      <option value="">Select Monologue Scripts</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="access_monologue_scripts"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Pinup Fav Alert Categories</label>
                    <Field as="select" name="pinup_fav_alert_categories" className="form-select">
                      <option value="">Select Alert Categories</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="pinup_fav_alert_categories"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Unlimited Posts</label>
                    <Field as="select" name="unlimited_posts" className="form-select">
                      <option value="">Select Unlimited Posts</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="unlimited_posts"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Personalized Alerts</label>
                    <Field as="select" name="personalized_alerts" className="form-select">
                      <option value="">Select Personalized Alerts</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="personalized_alerts"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Ads Free Platform</label>
                    <Field as="select" name="ads_free_platform" className="form-select">
                      <option value="">Select Ads Free Platform</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="ads_free_platform"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">State Based Updates</label>
                    <Field as="select" name="state_based_updates" className="form-select">
                      <option value="">Select State Based Updates</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="state_based_updates"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Unlock Filter Options</label>
                    <Field as="select" name="unlock_filter_options" className="form-select">
                      <option value="">Select Unlock Filter Options</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="unlock_filter_options"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Live Workshop Enrollment</label>
                    <Field as="select" name="live_workshop_enrollment" className="form-select">
                      <option value="">Select Live Workshop Enrollment</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage
                      name="live_workshop_enrollment"
                      component="div"
                      className="text-danger fs-12 mt-1"
                    />
                  </div>
                  {/* <div className="col-md-12 mb-3">
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
                  </div> */}
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

export default SubscriptionPlanUpdateContent;
