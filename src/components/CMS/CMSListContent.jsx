import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../Services/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CMSListContent = () => {
  const [cmsList, setCMSList] = useState([]);

  const fetchPages = async () => {
    try {
      const res = await getData(`/page-content`);
      if (res) {
        setCMSList(res.data || []);
      }
    } catch (error) {
      console.log("error fetch cms", error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);


  const handleDelete = (catId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteData(`/page-content/${catId}`,);
          if (res) {
            toast.success(res.message);
            await fetchPages();
          }
        } catch (error) {
          console.log("error delete cms", error)
        }
      }
    });
  }

  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">CMS List</h5>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th scope="col"> S.No. </th>
                  <th scope="col">Content Type </th>
                  <th scope="col">Title</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  cmsList?.length > 0 ? (
                    cmsList?.map((cms, index) => {
                      return (
                        <tr key={cms.id}>
                          <td>{index + 1}</td>
                          <td>{cms?.content_type}</td>
                          <td>{cms?.title}</td>
                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <Link to={`/cms/view/${cms.id}`} className="btn btn-sm btn-light"><FiEye /></Link>
                              <Link to={`/cms/update/${cms.id}`} className="btn btn-sm btn-light"><FiEdit3 /></Link>
                              <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(cms.id)}><FiTrash2 /></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className='text-center'>No CMS Page Found</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default CMSListContent