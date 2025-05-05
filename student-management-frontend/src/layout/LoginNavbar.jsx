import {Link} from "react-router-dom";

const LoginNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <Link to={"/register"} className="btn btn-outline-light">Register</Link>
            </div>
        </nav>
    );
}

export default LoginNavbar;
