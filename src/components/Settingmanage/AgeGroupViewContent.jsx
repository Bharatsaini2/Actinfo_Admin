import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';
const AgeGroupViewContent = () => {
  const { id } = useParams();

  const [values, setValues] = useState({
    age_grp: '',
    status: '',
  })

  const fetchAgeGroups = async () => {
    try {
      const res = await getData(`/agegroups/${id}`);
      if (res.status_code === 200) {
        setValues(res.data || {});
      }
    } catch (error) {
      console.log("error fetch age group", error);
    }
  }

  useEffect(() => {
    fetchAgeGroups();
  }, [id]);
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Age Group Details</h5>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-sm-6 my-3">
                <label className="form-label">Age Group</label>
                <input type="text" className="form-control" name="cat_name" value={values.age_grp} disabled placeholder="Age Group" />
              </div>
              <div className="col-sm-6 my-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={values.status ? "1" : "0"}  disabled>
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">InActive</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgeGroupViewContent