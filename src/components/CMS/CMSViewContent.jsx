import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';

const CMSViewContent = () => {
  const { id } = useParams();

  const [values, setValues] = useState({
    content_type: '',
    title: '',
    description: '',
  })

  const fetchPages = async () => {
    try {
      const res = await getData(`/page-content/${id}`);
      if (res) {
        setValues(res.data || {});
      }
    } catch (error) {
      console.log("error fetch cms", error);
    }
  }

  useEffect(() => {
    fetchPages();
  }, [id]);
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">CMS Details</h5>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 col-sm-6 my-3">
                <label className="form-label">Content Type</label>
                <input type="text" className="form-control" name="content_type" value={values.content_type} disabled placeholder="Content Type" />
              </div>
              <div className="col-sm-6 col-md-6 my-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" placeholder="Title Name" name="title" value={values.title} disabled />
              </div>
              <div className="col-sm-12 my-3">
                <label className="form-label">Description</label>
                <div className='border rounded p-3'>
                  <p dangerouslySetInnerHTML={{ __html: values.description }} disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CMSViewContent