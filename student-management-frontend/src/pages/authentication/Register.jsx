import {Fragment} from "react";
import RegisterNavbar from "../../layout/RegisterNavbar.jsx";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formattedData = Object.fromEntries(formData.entries());
        console.log(formattedData);

        if (formattedData.username === "") {
            alert("The 'Username' field cannot be empty");
            return;
        }

        if (formattedData.email === "") {
            alert("The 'Email' field cannot be negative");
            return;
        }

        if (formattedData.password === "") {
            alert("The 'Password' field cannot be less than 1886");
            return;
        }

        const user = {
            username: formattedData.username,
            userRole: formattedData.role,
            email: formattedData.email,
            password: formattedData.password
        }
        axios.post(`${serverUrl}/api/v1/user/register`, user)
            .then(() => navigate("/login"))
            .catch(() => alert("User with the provided username already exists"));
    }

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
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="username" name="username" className="form-control" placeholder="Username" style={{marginBottom: "10px"}} />

                            <label htmlFor="role" className="form-label">Role</label>
                            <select id="role" name="role" className="form-control" style={{marginBottom: "10px"}}>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>

                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Email" style={{marginBottom: "10px"}} />

                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Password" style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;
