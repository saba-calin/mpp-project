import {Fragment} from "react";
import AddUserNavbar from "../layout/AddUserNavbar.jsx";
import {useLocalStorage} from "../useLocalStorage.js";

const AddUser = () => {
    const [storedData, setStoredData] = useLocalStorage('students', []);

    const getId = () => {
        const students = JSON.parse(localStorage.getItem('students')) ?? [];

        let id = 0;
        for (const student of students) {
            if (Number(student.id) > id) {
                id = Number(student.id);
            }
        }
        return id + 1;
    }

    const handleSubmit = (eventObj) => {
        eventObj.preventDefault();

        const data = new FormData(eventObj.target);
        const formattedData = Object.fromEntries(data.entries());

        setStoredData([...storedData, {...formattedData, "id": getId()}]);
    }

    return (
        <Fragment>
            <AddUserNavbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Enter a new Student
                        </h2>
                        <form className="mb-3 text-center" onSubmit={handleSubmit}>
                            <label htmlFor="fist_name" className="form-label">First Name</label>
                            <input type="text" id="fist_name" name="first_name" className="form-control" placeholder="First Name" style={{marginBottom: "10px"}} />

                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Last Name" style={{marginBottom: "10px"}} />

                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Email" style={{marginBottom: "10px"}} />

                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" id="age" name="age" className="form-control" placeholder="Age" style={{marginBottom: "10px"}} />

                            <label htmlFor="grade" className="form-label">Grade</label>
                            <input type="number" id="grade" name="grade" className="form-control" placeholder="Grade" style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AddUser;
