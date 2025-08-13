import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';
const CityViewContent = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        country_id: '',
        state_id: '',
        city_name: '',
    })
    const [countryList, setcountryList] = useState([]);
    const [stateList, setStateList] = useState([]);

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
            const res = await getData(`/state?limit=${1000}`);
            if (res.status_code === 200) {
                setStateList(res.data || []);
            }
        } catch (error) {
            console.log("error fetch state", error);
        }
    }
    const fetchCities = async () => {
        try {
            const res = await getData(`/city/${id}`);
            if (res.status_code === 200) {
                setValues(res.data || {});
            }
        } catch (error) {
            console.log("error fetch City", error);
        }
    }


    useEffect(() => {
        fetchStates();
        fetchCountries();
        fetchCities()
    }, [id]);
    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">city Details</h5>
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
                            <div className="col-sm-6 my-3">
                                <label className="form-label">State</label>
                                <select className="form-select" name="state_id" value={values.state_id} disabled>
                                    <option value="">Select State</option>
                                    {
                                        stateList?.map((count, index) => {
                                            return (
                                                <option key={count.id} value={count.id}>{count.state_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 col-sm-6 my-3">
                                <label className="form-label">City Name</label>
                                <input type="text" className="form-control" name="city_name" value={values.city_name} disabled placeholder="City Name" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CityViewContent