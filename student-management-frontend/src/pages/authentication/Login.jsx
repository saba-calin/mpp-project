import {Fragment} from "react";
import LoginNavbar from "../../layout/LoginNavbar.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";

const Login = () => {
    const navigate = useNavigate();
    const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formattedData = Object.fromEntries(formData.entries());

        const userRequest = {
            username: formattedData.username,
            password: formattedData.password
        };
        axios.post(`${serverUrl}/api/v1/auth/login`, userRequest)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                console.log(token);

                navigate("/");
            })
            .catch(() => alert("Invalid credentials"));
    }

    return (
        <Fragment>
            <LoginNavbar />

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Log In
                        </h2>
                        <form role="form" className="mb-3 text-center" onSubmit={handleEdit}>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="username" name="username" className="form-control" placeholder="Username" style={{marginBottom: "10px"}} />

                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Password" style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
