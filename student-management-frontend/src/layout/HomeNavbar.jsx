import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {serverUrl} from "../serverUrl.js";

const HomeNavbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const checkIfAdmin = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${serverUrl}/api/v1/auth/is-admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsAdmin(response.data);
        }
        checkIfAdmin();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <div>
                    {isAdmin
                        ? <Link to={"/dashboard"} className="btn btn-outline-light" style={{marginRight: "10px"}}>Dashboard</Link>
                        : null}
                    <Link to={"/login"} className="btn btn-outline-light" style={{marginRight: "10px"}}>Logout</Link>
                    <Link to={"/stats"} className="btn btn-outline-light" style={{marginRight: "10px"}}>Stats</Link>
                    <Link to={"/adduser"} className="btn btn-outline-light">Add Student</Link>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavbar;
