import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';
import { Select } from "antd";
const { Option } = Select;
const SubscriptionPlanViewContent = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        device: "",
        title: "",
        plan_validity: "",
        plan_validity_type: "",
        price: "",
        discount: "",
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
        // description: "",
    })

    const fetchPlans = async () => {
        try {
            const res = await getData(`/subscription-plan/${id}`);
            if (res.status_code === 200) {
                setValues(res.plan || {});
            }
        } catch (error) {
            console.log("error fetch subscription-plan", error);
        }
    }

    useEffect(() => {
        fetchPlans();
    }, [id]);
    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Subscription Plan Details</h5>
                    </div>
                    <div className="card-body">
                        {/* Personal Fields */}
                        <div className="row mb-3">
                            <div className="col-md-6 col-sm-6 my-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" value={values.title} disabled placeholder="Title" />
                            </div>
                            <div className="col-md-3 col-sm-3 my-3">
                                <label className="form-label">Plan Validity</label>
                                <input type="text" className="form-control" name="plan_validity" value={values.plan_validity} disabled placeholder="Plan Validity" />
                            </div>
                            <div className="col-sm-3 my-3">
                                <label className="form-label">Plan Validity Type</label>
                                <select className="form-select" name="plan_validity_type" value={values.plan_validity_type} disabled>
                                    <option value="">Select Plan Validity Type</option>
                                    <option value="1">Day</option>
                                    <option value="2">Month</option>
                                    <option value="3">Year</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-sm-6 my-3">
                                <label className="form-label">Price</label>
                                <input type="text" className="form-control" name="price" value={values.price} disabled placeholder="price" />
                            </div>
                            <div className="col-md-6 col-sm-6 my-3">
                                <label className="form-label">Discount</label>
                                <input type="text" className="form-control" name="discount" value={values.discount} disabled placeholder="discount" />
                            </div>
                            <div className="col-md-6 my-3">
                                <label className="form-label">Add Categories</label>
                                <span name="plan_included_categories">
                                    <Select
                                        mode="multiple"
                                        placeholder="Select Categories"
                                        value={values.plan_included_categories ? values.plan_included_categories.split(",") : []} // convert CSV -> array
                                        style={{ width: "100%", height: "50px" }}
                                    >
                                        <Option value="1">Upload Audition</Option>
                                        <Option value="2">Monologue Script</Option>
                                        <Option value="3">Acting Profile</Option>
                                    </Select>
                                </span>
                            </div>
                            <div className="col-sm-6 my-3">
                                <label className="form-label">Skip Advertise</label>
                                <select className="form-select" name="skip_advertise" value={values.skip_advertise} disabled>
                                    <option value="">Select Advertise Type</option>
                                    <option value="1">Manuual</option>
                                    <option value="2">Google</option>
                                    <option value="3">Facebook</option>
                                </select>
                            </div>
                            <div className="col-sm-6 my-3">
                                <label className="form-label">Status</label>
                                <select className="form-select" name="status" value={values.status} disabled>
                                    <option value="">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="2">Deactive</option>
                                </select>
                            </div>
                            <div className="col-sm-6 my-3">
                                <label className="form-label">Device</label>
                                <select className="form-select" name="device" value={values.device} disabled>
                                    <option value="">Select Device</option>
                                    <option value="0">Android</option>
                                    <option value="1">iPhone</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Unlimited Daily Alerts</label>
                                <select name="unlimited_daily_alerts" value={values.unlimited_daily_alerts} disabled className="form-select">
                                    <option value="">Select Daily Alerts</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Access Monologue Scripts</label>
                                <select name="access_monologue_scripts" value={values.access_monologue_scripts} disabled className="form-select">
                                    <option value="">Select Monologue Scripts</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Pinup Fav Alert Categories</label>
                                <select name="pinup_fav_alert_categories" value={values.pinup_fav_alert_categories} disabled className="form-select">
                                    <option value="">Select Alert Categories</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Unlimited Posts</label>
                                <select name="unlimited_posts" value={values.unlimited_posts} disabled className="form-select">
                                    <option value="">Select Unlimited Posts</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Personalized Alerts</label>
                                <select name="personalized_alerts" value={values.personalized_alerts} disabled className="form-select">
                                    <option value="">Select Personalized Alerts</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Ads Free Platform</label>
                                <select name="ads_free_platform" value={values.ads_free_platform} disabled className="form-select">
                                    <option value="">Select Ads Free Platform</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">State Based Updates</label>
                                <select name="state_based_updates" value={values.state_based_updates} disabled className="form-select">
                                    <option value="">Select State Based Updates</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Unlock Filter Options</label>
                                <select name="unlock_filter_options" value={values.unlock_filter_options} disabled className="form-select">
                                    <option value="">Select Unlock Filter Options</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Live Workshop Enrollment</label>
                                <select name="live_workshop_enrollment" value={values.live_workshop_enrollment} disabled className="form-select">
                                    <option value="">Select Live Workshop Enrollment</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            {/* <div className="col-sm-12 my-3">
                                <label className="form-label">Description</label>
                                <div className='border rounded p-3'>
                                    <p dangerouslySetInnerHTML={{ __html: values.description }} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubscriptionPlanViewContent