import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const HomeNavbar = () => {
    const [userRole, setUserRole] = useState("user");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserRole(user.userRole);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <div>
                    {userRole === "admin"
                        ? <Link to={"/stats"} className="btn btn-outline-light" style={{marginRight: "10px"}}>Dashboard</Link>
                        : null}
                    <Link to={"/stats"} className="btn btn-outline-light" style={{marginRight: "10px"}}>Stats</Link>
                    <Link to={"/adduser"} className="btn btn-outline-light">Add Student</Link>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavbar;
