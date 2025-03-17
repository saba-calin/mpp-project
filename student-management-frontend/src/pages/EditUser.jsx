import {Fragment, useEffect, useState} from "react";
import AddUserNavbar from "../layout/AddUserNavbar.jsx";
import {useParams} from "react-router-dom";

const EditUser = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        setStudents(JSON.parse(localStorage.getItem("students")) ?? []);
    }, []);

    const {id} = useParams();
    const numericId = Number(id);
    const student = students.find(s => s.id === numericId);
    // console.log(student);

    const handleEdit = (eventObj) => {
        eventObj.preventDefault();

        const data = new FormData(eventObj.target);
        const formattedData = Object.fromEntries(data.entries());
        console.log(formattedData);

        const newStudents = students.filter(s => s.id !== numericId);
        localStorage.setItem("students", JSON.stringify([...newStudents, {...formattedData, "id": numericId}]))
    }

    if (!student) {
        return (
            <Fragment>
                <AddUserNavbar />
                <div>Loading...</div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <AddUserNavbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Editing Student with id: {student.id}
                        </h2>
                        <form className="mb-3 text-center" onSubmit={handleEdit}>
                            <label htmlFor="fist_name" className="form-label">First Name</label>
                            <input type="text" id="fist_name" name="first_name" className="form-control" placeholder="First Name" defaultValue={student.first_name} style={{marginBottom: "10px"}} />

                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Last Name" defaultValue={student.last_name} style={{marginBottom: "10px"}} />

                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Email" defaultValue={student.email} style={{marginBottom: "10px"}} />

                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" id="age" name="age" className="form-control" placeholder="Age" defaultValue={student.age} style={{marginBottom: "10px"}} />

                            <label htmlFor="grade" className="form-label">Grade</label>
                            <input type="number" id="grade" name="grade" className="form-control" placeholder="Grade" defaultValue={student.grade} style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditUser;
