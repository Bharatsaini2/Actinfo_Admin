import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';
const CategoryViewContent = () => {
  const { id } = useParams();

  const [values, setValues] = useState({
    cat_name: '',
    cat_type: '',
    can_user_post: '',
    can_show_age_grp: '',
    status: '',
    location_enable: '',
    button_name: '',
    message_template: '',
    cat_icon_image: null,
  })

  const fetchCategories = async () => {
    try {
      const res = await getData(`/admin-categories/${id}`);
      if (res.status_code === 200) {
        setValues(res.data || {});
      }
    } catch (error) {
      console.log("error fetch category", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [id]);
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Category Details</h5>
          </div>
          <div className="card-body">
            <div className="row mb-4 ">
              <div className="col-sm-12">
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <label className="fw-semibold">Category Icon: </label>
                  <div className="mb-4 mb-md-0 gap-4 your-brand ">
                    <label htmlFor='img' className="wd-100 ht-100 position-relative overflow-hidden border border-gray-2 rounded">
                      <img src={values?.cat_icon_image ? `${values?.cat_icon_image}` : "/images/avatar/1.png"} crossOrigin="anonymous" className="upload-pic img-fluid rounded h-100 w-100" alt="catIcon" />
                      <input className="file-upload" type="file" accept="image/*" id='img' hidden />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Personal Fields */}
            <div className="row mb-3">
              <div className="col-md-6 col-sm-6 my-3">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-control" name="cat_name" value={values.cat_name} disabled placeholder="Full Name" />
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Category Type</label>
                <select className="form-select" name="cat_type" value={values.cat_type} disabled>
                  <option value="">Select Category Type</option>
                  <option value="1">Unpaid</option>
                  <option value="2">Paid</option>
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Upload User Post</label>
                <select className="form-select" name="can_user_post" value={values.can_user_post} disabled>
                  <option value="">Select User Post</option>
                  <option value="1">Allowed</option>
                  <option value="2">Not Allowed</option>
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Age Group</label>
                <select className="form-select" name="can_show_age_grp" value={values.can_show_age_grp} disabled>
                  <option value="">Select Age Group</option>
                  <option value="1">Show</option>
                  <option value="2">Don't Show</option>
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={values.status} disabled>
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">InActive</option>
                </select>
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Location Enabled</label>
                <select className="form-select" name="location_enable" value={values.location_enable} disabled>
                  <option value="">Select Location</option>
                  <option value="1">Enable</option>
                  <option value="2">Disable</option>
                </select>
              </div>
              <div className="col-sm-12 my-3">
                <label className="form-label">Button Name</label>
                <input type="text" className="form-control" placeholder="Button Name" name="button_name" value={values.button_name} disabled />
              </div>
              <div className="col-sm-12 my-3">
                <label className="form-label">Message Template</label>
                <div className='border rounded p-3'>
                  <p dangerouslySetInnerHTML={{ __html: values.message_template }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryViewContent