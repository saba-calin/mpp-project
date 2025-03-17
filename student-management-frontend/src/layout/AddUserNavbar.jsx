import {Link} from "react-router-dom";

const AddUserNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <Link to={"/"} className="btn btn-outline-light">Home</Link>
            </div>
        </nav>
    );
}

export default AddUserNavbar;
