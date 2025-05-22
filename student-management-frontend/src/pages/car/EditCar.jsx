import {Fragment, useEffect, useState} from "react";
import AddCarNavbar from "../../layout/AddCarNavbar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";

const EditCar = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }

        const data = {
            token: token
        }
        axios.post(`${serverUrl}/auth/is-user`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((error) => {
                navigate("/login");
            });
    }, []);

    const {carId} = useParams();

    const [token, setToken] = useState("");
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const [user, setUser] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);
    const buildOperationLog = (operation, token) => {
        return {
            token: token,
            operation: operation,
            date: new Date()
        };
    }

    const [car, setCar] = useState({student: []});
    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchStudent = async () => {
            const response = await axios.get(`${serverUrl}/cars?id=${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCar(response.data);
            console.log(response.data);
        }
        fetchStudent();
    }, [token]);

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
        axios.put(`${serverUrl}/cars?id=${carId}`, car, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch(() => {
                alert("Owner with the provided id does not exist");
            });
        axios.post(`${serverUrl}/logs`, buildOperationLog("put_car", token), {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
