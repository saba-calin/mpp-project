import {Link, useParams} from "react-router-dom";

const AddCarNavbar = () => {
    const {id} = useParams();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <div>
                    <Link to={`/edituser/${id}`} className="btn btn-outline-light">Back</Link>
                </div>
            </div>
        </nav>
    );
}

export default AddCarNavbar;
