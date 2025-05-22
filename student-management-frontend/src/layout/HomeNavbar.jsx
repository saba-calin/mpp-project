import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {serverUrl} from "../serverUrl.js";

const HomeNavbar = () => {
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const checkIfAdmin = async () => {
            const token = localStorage.getItem("token");
            const data = {
                token: token
            }
            const response = await axios.post(`${serverUrl}/auth/is-admin`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("resp " + response.data);
            setIsAdmin(response.data);
        }
        checkIfAdmin();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <div>
                    {isAdmin
                        ? <Link to={"/dashboard"} className="btn btn-outline-light" style={{marginRight: "10px"}}>Dashboard</Link>
                        : null}
                    <button onClick={handleLogout} className="btn btn-outline-light" style={{marginRight: "10px"}}>Logout</button>
                    <Link to={"/stats"} className="btn btn-outline-light" style={{marginRight: "10px"}}>Stats</Link>
                    <Link to={"/adduser"} className="btn btn-outline-light">Add Student</Link>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavbar;
