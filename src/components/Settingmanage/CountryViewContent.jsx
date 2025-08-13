import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../Services/api';

const CountryViewContent = () => {
    const { id } = useParams();

    const [values, setValues] = useState({
        country_name: '',
        country_code: '',
    })

    const fetchCountries = async () => {
        try {
            const res = await getData(`/country/${id}`);
            if (res.status_code === 200) {
                setValues(res.data || {});
            }
        } catch (error) {
            console.log("error fetch countries", error);
        }
    }

    useEffect(() => {
        fetchCountries();
    }, [id]);
    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Country Details</h5>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6 col-sm-6 my-3">
                                <label className="form-label">Country Code</label>
                                <input type="text" className="form-control" name="country_code" value={values.country_code} disabled placeholder="Country Code" />
                            </div>
                            <div className="col-md-6 col-sm-6 my-3">
                                <label className="form-label">Country Name</label>
                                <input type="text" className="form-control" name="country_name" value={values.country_name} disabled placeholder="Country Name" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountryViewContent