import {Fragment, useState} from "react";
import RegisterNavbar from "../../layout/RegisterNavbar.jsx";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [username, setUsername] = useState("");

    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formattedData = Object.fromEntries(formData.entries());
        console.log(formattedData);

        if (formattedData.firstName === "") {
            alert("The 'First Name' field cannot be empty");
            return;
        }

        if (formattedData.lastName === "") {
            alert("The 'Last Name' field cannot be empty");
            return;
        }

        if (formattedData.username === "") {
            alert("The 'Username' field cannot be empty");
            return;
        }

        if (formattedData.password === "") {
            alert("The 'Password' field cannot be less than 1886");
            return;
        }

        setUsername(formattedData.username);
        const user = {
            firstName: formattedData.firstName,
            lastName: formattedData.lastName,
            username: formattedData.username,
            password: formattedData.password,
            role: formattedData.role
        }
        axios.post(`${serverUrl}/auth/register/init`, user)
            .then((response) => {
                const data = response.data;
                setQrCodeUrl(data.qrCodeUrl);
            })
            .catch(() => {
                alert("User already exists");
            });
    }

    const handleConfirmRegistration = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formattedData = Object.fromEntries(formData.entries());

        const registerConfirmRequest = {
            username: username,
            verificationCode: formattedData.code
        };
        axios.post(`${serverUrl}/auth/register/confirm`, registerConfirmRequest)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                console.log(token);

                navigate("/");
            })
            .catch(() => {
                alert("Invalid code");
            });
    }

    if (qrCodeUrl === "") {
        return (
            <Fragment>
                <RegisterNavbar />

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                            <h2 className="text-center">
                                Register
                            </h2>
                            <form role="form" className="mb-3 text-center" onSubmit={handleEdit}>
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" style={{marginBottom: "10px"}} />

                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" style={{marginBottom: "10px"}} />

                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" id="username" name="username" className="form-control" placeholder="Username" style={{marginBottom: "10px"}} />

                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" id="password" name="password" className="form-control" placeholder="Password" style={{marginBottom: "10px"}} />

                                <label htmlFor="role" className="form-label">Role</label>
                                <select id="role" name="role" className="form-control" style={{marginBottom: "50px"}}>
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>

                                <button type="submit" className="btn btn-outline-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    else {
        return (
            <Fragment>
                <RegisterNavbar />

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                            <h2 className="text-center" style={{marginBottom: "50px"}}>
                                Scan the QR Code to register
                            </h2>
                            <form role="form" className="mb-3 text-center" onSubmit={handleConfirmRegistration}>
                                <img src={qrCodeUrl} alt="QR Code" style={{marginBottom: "50px", width: "300px", height: "300px"}} />
                                <br />

                                <label htmlFor="code" className="form-label">2FA Code</label>
                                <input type="number" id="code" name="code" className="form-control" placeholder="2FA Code" style={{marginBottom: "50px"}} />

                                <button type="submit" className="btn btn-outline-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Register;
