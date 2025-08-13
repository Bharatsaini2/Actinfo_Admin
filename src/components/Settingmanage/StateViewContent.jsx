import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';
const StateViewContent = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        country_id: '',
        state_name: '',
    })
    const [countryList, setcountryList] = useState([]);

    const fetchCountries = async () => {
        try {
            const res = await getData(`/country?limit=${1000}`);
            if (res.status_code === 200) {
                setcountryList(res.data || []);
            }
        } catch (error) {
            console.log("error fetch country", error);
        }
    }

    const fetchStates = async () => {
        try {
            const res = await getData(`/state/${id}`);
            if (res.status_code === 200) {
                setValues(res.data || {});
            }
        } catch (error) {
            console.log("error fetch States", error);
        }
    }

    useEffect(() => {
        fetchStates();
        fetchCountries();
    }, [id]);
    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">State Details</h5>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-sm-6 my-3">
                                <label className="form-label">Country</label>
                                <select className="form-select" name="country_id" value={values.country_id} disabled>
                                    <option value="">Select Country</option>
                                    {
                                        countryList?.map((count, index) => {
                                            return (
                                                <option key={count.id} value={count.id}>{count.country_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 col-sm-6 my-3">
                                <label className="form-label">State Name</label>
                                <input type="text" className="form-control" name="state_name" value={values.state_name} disabled placeholder="State Name" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StateViewContent