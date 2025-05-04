import {Fragment, useEffect, useState} from "react";
import AddCarNavbar from "../../layout/AddCarNavbar.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";

const EditCar = () => {
    const {carId} = useParams();

    const [car, setCar] = useState({student: []});
    useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get(`${serverUrl}/api/v1/cars?id=${carId}`);
            setCar(response.data);
            console.log(response.data);
        }
        fetchStudent();
    }, []);

    const handleEdit = (eventObj) => {
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
            studentId: formattedData.ownerId
        }
        axios.put(`${serverUrl}/api/v1/cars?id=${carId}`, car)
            .catch(() => {
                alert("Owner with the provided id does not exist");
            });
    }

    return (
        <Fragment>
            <AddCarNavbar />

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Editing Car with id: {car.id}
                        </h2>
                        <form role="form" className="mb-3 text-center" onSubmit={handleEdit}>
                            <label htmlFor="brand" className="form-label">Brand</label>
                            <input type="text" id="brand" name="brand" className="form-control" placeholder="Brand" defaultValue={car.brand} style={{marginBottom: "10px"}} />

                            <label htmlFor="km" className="form-label">Kilometers</label>
                            <input type="number" id="km" name="km" className="form-control" placeholder="Kilometers" defaultValue={car.km} style={{marginBottom: "10px"}} />

                            <label htmlFor="year" className="form-label">Year</label>
                            <input type="number" id="year" name="year" className="form-control" placeholder="Year" defaultValue={car.year} style={{marginBottom: "10px"}} />

                            <label htmlFor="ownerId" className="form-label">Owner Id</label>
                            <input type="number" id="ownerId" name="ownerId" className="form-control" placeholder="Owner Id" defaultValue={car.student.id} style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditCar;
