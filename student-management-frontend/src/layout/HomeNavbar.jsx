import {Link} from "react-router-dom";

const HomeNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <Link to={"/adduser"} className="btn btn-outline-light">Add Student</Link>
            </div>
        </nav>
    );
}

export default HomeNavbar;
