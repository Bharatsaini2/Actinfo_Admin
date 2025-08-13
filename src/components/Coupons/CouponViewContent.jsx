import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';

const CouponViewContent = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    title: '',
    code: '',
    validity_type: '',
    description: '',
    discount: "",
    type: "",
    start_date: "",
    end_date: "",
    created_by: "",
    coup_for: "",
  })

  const fetchCoupons = async () => {
    try {
      const res = await getData(`/coupon/${id}`);
      if (res.status_code === 200) {
        setValues(res.data || {});
      }
    } catch (error) {
      console.log("error fetch coupon", error);
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, [id]);
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Coupon Details</h5>
          </div>
          <div className="card-body">
            {/* Personal Fields */}
            <div className="row mb-3">
              <div className="col-md-6 col-sm-6 my-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={values.title} disabled placeholder="Title" />
              </div>
              <div className="col-md-6 col-sm-6 my-3">
                <label className="form-label">Coupon Code</label>
                <input type="text" className="form-control" name="code" value={values.code} disabled placeholder="Coupon Code" />
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Validity Type</label>
                <select className="form-select" name="validity_type" value={values.validity_type} disabled>
                  <option value="">Select Validaty Type</option>
                  <option value="limited">Limited</option>
                  <option value="unlimited">Unlimited</option>
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Coupon Type</label>
                <select className="form-select" name="type" value={values.type} disabled>
                  <option value="">Select Coupon Type</option>
                  <option value="upto">Upto</option>
                  <option value="flat">Flat</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Coupon For</label>
                <select className="form-select" name="coup_for" value={values.coup_for} disabled>
                  <option value="">Coupon For</option>
                  <option value="subscription plan">Subscription Plan</option>
                  <option value="live class">Live Class</option>
                  <option value="acting course">Acting Course</option>
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Discount</label>
                <input type="text" className="form-control" placeholder="discount" name="discount" value={values.discount} disabled />
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Start Date</label>
                <input type="date" className="form-control" placeholder="Start Date" name="start_date" value={values?.start_date?.split('T')[0]} disabled />
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">End Date</label>
                <input type="date" className="form-control" placeholder="End Date" name="end_date" value={values?.end_date?.split('T')[0]} disabled />
              </div>
              <div className="col-sm-12 my-3">
                <label className="form-label">Description</label>
                <div className='border rounded p-3'>
                  <p dangerouslySetInnerHTML={{ __html: values.description }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CouponViewContent