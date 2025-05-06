import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AddCarNavbar from "../../layout/AddCarNavbar.jsx";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";

const AddCar = () => {
    const {id} = useParams();

    const [user, setUser] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);
    const buildOperationLog = (operation) => {
        return {
            userId: user.id,
            operation: operation,
            date: new Date()
        };
    }

    const handleSubmit = (eventObj) => {
        eventObj.preventDefault();

        const formData = new FormData(eventObj.target);
        const formattedData = Object.fromEntries(formData.entries());

        if (formattedData.brand === "") {
            alert("The 'Brand' field cannot be empty");
            return;
        }

        if (formattedData.km < 0) {
            alert("The 'Kilometers' field cannot be negative");
            return;
        }

        if (formattedData.year < 1886) {
            alert("The 'Year' field cannot be less than 1886");
            return;
        }
        if (formattedData.year > 2025) {
            alert("The 'Year' field cannot be greater than 2025");
            return;
        }

        const car = {
            brand: formattedData.brand,
            km: formattedData.km,
            year: formattedData.year,
            studentId: id
        }
        axios.post(`${serverUrl}/api/v1/cars`, car);
        axios.post(`${serverUrl}/api/v1/logs`, buildOperationLog("post_car"));
    }

    return (
        <Fragment>
            <AddCarNavbar />

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Enter a new Car for Student with id: {id}
                        </h2>
                        <form role="form" className="mb-3 text-center" onSubmit={handleSubmit}>
                            <label htmlFor="brand" className="form-label">Brand</label>
                            <input type="text" id="brand" name="brand" className="form-control" placeholder="Brand" style={{marginBottom: "10px"}} />

                            <label htmlFor="km" className="form-label">Kilometers</label>
                            <input type="number" id="km" name="km" className="form-control" placeholder="Kilometers" style={{marginBottom: "10px"}} />

                            <label htmlFor="year" className="form-label">Year</label>
                            <input type="number" id="year" name="year" className="form-control" placeholder="Year" style={{marginBottom: "10px"}} />

                            <button type="submit" className="btn btn-outline-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AddCar;
