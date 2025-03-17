import {Fragment, useEffect, useState} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import {Link} from "react-router-dom";

const Home = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        setStudents(JSON.parse(localStorage.getItem("students")) ?? []);
    }, []);

    const handleDelete = (id) => {
        const newStudents = students.filter(s => s.id !== id);
        setStudents(newStudents);
        localStorage.setItem("students", JSON.stringify(newStudents));
    }

    return (
        <Fragment>
            <HomeNavbar />

            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Grade</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s.id}>
                                    <th scope="row">{s.id}</th>
                                    <td>{s.first_name}</td>
                                    <td>{s.last_name}</td>
                                    <td>{s.email}</td>
                                    <td>{s.grade}</td>
                                    <td className="text-center">
                                        {/*<button className="btn btn-primary mx-2">View</button>*/}
                                        <Link className="btn btn-primary mx-2" to={`/edituser/${s.id}`}>Edit</Link>
                                        <button className="btn btn-danger mx-2" onClick={() => handleDelete(s.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
