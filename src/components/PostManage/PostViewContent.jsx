import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';
const PostViewContent = () => {
  const { id } = useParams();

  const [values, setValues] = useState({
    category_name: '',
    gender: '',
    description: '',
    created_at: '',
    PostAgeGroups: [],
    PostImages: [],
    PostSelectedStates: []
  });

  const fetchPosts = async () => {
    try {
      const res = await getData(`/admin-post/${id}`);
      if (res.status_code === 200) {
        setValues(res.data?.[0] || {});
      }
    } catch (error) {
      console.log("error fetch category", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [id]);
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Post Details</h5>
          </div>
          <div className="card-body">
            {/* Personal Fields */}
            <div className="row mb-3">
              <div className="col-sm-6 my-2">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-control" value={values.category_name} disabled />
              </div>

              <div className="col-sm-6 my-2">
                <label className="form-label">Gender</label>
                <input type="text" className="form-control" value={values.gender} disabled />
              </div>

              <div className="col-sm-6 my-2">
                <label className="form-label">States</label>
                <input
                  type="text"
                  className="form-control"
                  value={values?.PostSelectedStates.map(state => state.state_name).join(', ')}
                  disabled
                />
              </div>

              <div className="col-sm-6 my-2">
                <label className="form-label">Age Groups</label>
                <input
                  type="text"
                  className="form-control"
                  value={values?.PostAgeGroups.map(age => `${age.age_grp} Years`).join(', ')}
                  disabled
                />
              </div>

              <div className="col-sm-12 my-3">
                <label className="form-label">Description</label>
                <div
                  className="border rounded p-2"
                  dangerouslySetInnerHTML={{ __html: values?.description }}
                />
              </div>

              <div className="col-sm-12 my-3">
                <label className="form-label">Images</label>
                <div className="d-flex gap-3 flex-wrap">
                  {values?.PostImages.map((img, i) => (
                    <img
                      key={i}
                      src={img?.file_path}
                      alt={`post-img-${i}`}
                      crossOrigin="anonymous"
                      className="rounded border"
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                  ))}
                </div>
              </div>

              <div className="col-sm-6 my-2">
                <label className="form-label">Created At</label>
                <input
                  type="text"
                  className="form-control"
                  value={new Date(values.created_at).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                  disabled
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default PostViewContent