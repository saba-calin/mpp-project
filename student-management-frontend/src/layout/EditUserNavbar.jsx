import {Link, useParams} from "react-router-dom";

const EditUserNavbar = () => {
    const {id} = useParams();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Student Management App</a>
                <div>
                    <Link to={`/edituser/${id}/addcar`} className="btn btn-outline-light" style={{marginRight: "10px"}}>Add Car</Link>
                    <Link to={"/"} className="btn btn-outline-light">Home</Link>
                </div>
            </div>
        </nav>
    );
}

export default EditUserNavbar;
