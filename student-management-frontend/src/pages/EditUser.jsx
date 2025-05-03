import {Fragment, useEffect, useState} from "react";
import AddUserNavbar from "../layout/AddUserNavbar.jsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import styles from "./EditUser.module.css"
import Button from "bootstrap/js/src/button.js";
import {serverUrl} from "../serverUrl.js";
import EditUserNavbar from "../layout/EditUserNavbar.jsx";

const EditUser = () => {
    const {id} = useParams();

    const [student, setStudent] = useState([]);
    const [image, setImage] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${serverUrl}/api/v1/students/${id}`);
            setStudent(response.data);

            const img = await axios.get(
                `${serverUrl}/api/v1/students/image?path=${response.data.path}`,
                { responseType: 'blob' }
            );
            const imageURL = URL.createObjectURL(img.data);
            setImage(imageURL);
        }

        fetchData();
    }, []);


    const handleEdit = (eventObj) => {
        eventObj.preventDefault();

        const data = new FormData(eventObj.target);
        const formattedData = Object.fromEntries(data.entries());

        if (formattedData.first_name === "") {
            alert("The 'First Name' field cannot be empty");
            return;
        }

        if (formattedData.last_name === "") {
            alert("The 'Last Name' field cannot be empty");
            return;
        }

        if (formattedData.email === "") {
            alert("The 'Email' field cannot be empty");
            return;
        }

        if (formattedData.age === "") {
            alert("The 'Age' field cannot be empty");
            return;
        }
        if (formattedData.age < 0 || formattedData.age > 150) {
            alert("Invalid age");
            return;
        }

        if (formattedData.grade === "") {
            alert("The 'Grade' field cannot be empty");
            return;
        }
        if (formattedData.grade < 1 || formattedData.grade > 10) {
            alert("Invalid grade");
            return;
        }

        if (formattedData.photo.size !== 0 && !formattedData.photo.name.endsWith(".jpg")) {
            alert("The photo must be a jpg");
            return;
        }

        const student = {
            id: id,
            firstName: formattedData.first_name,
            lastName: formattedData.last_name,
            email: formattedData.email,
            age: formattedData.age,
            grade: formattedData.grade
        }

        if (serverStatus === false || isOnline === false) {
            const updatedStudents = JSON.parse(localStorage.getItem("updated")) || [];

            const reader = new FileReader();
            reader.onload = () => {
                const base64Photo = reader.result;

                const newStudent = {
                    student,
                    photo: base64Photo
                };

                updatedStudents.push(newStudent);
                localStorage.setItem("updated", JSON.stringify(updatedStudents));
            };

            if (formattedData.photo.size !== 0) {
                reader.readAsDataURL(formattedData.photo);
            }
            else {
                const newStudent = {
                    student,
                    photo: ""
                };
                updatedStudents.push(newStudent);
                localStorage.setItem("updated", JSON.stringify(updatedStudents));
            }

            if (formattedData.photo.size !== 0) {
                setImage(URL.createObjectURL(formattedData.photo));
            }

            return;
        }

        const formData = new FormData();
        formData.append('student', JSON.stringify(student));
        formData.append('photo', formattedData.photo);

        console.log(formData);

        axios.put(`${serverUrl}/api/v1/students`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (formattedData.photo.size !== 0) {
            setImage(URL.createObjectURL(formattedData.photo));
        }
    }

    const handleDownloadImage = () => {
        if (serverStatus === false) {
            return;
        }

        const link = document.createElement('a');
        link.href = image;
        link.download = `student_image_${id}.jpg`;
        link.click();
    }

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const handleCheck = () => {
        setIsOnline(navigator.onLine);
    }
    useEffect(() => {
        console.log(navigator.onLine);
        window.addEventListener('online', handleCheck);
        window.addEventListener('offline', handleCheck);
    }, []);

    const [serverStatus, setServerStatus] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            if (isOnline === true) {
                axios.get(`${serverUrl}/api/health`)
                    .then(() => {
                        setServerStatus(true);
                    })
                    .catch(() => {
                        setServerStatus(false);
                    });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isOnline]);

    return (
        <Fragment>
            <EditUserNavbar/>

            <div className={styles.statusContainer}>
                <p>Status: {isOnline ? (serverStatus ? "Online" : "Server Down") : "Network Down"}</p>
                <div className={isOnline ? (serverStatus ? styles.onlineStatusCircle : styles.offlineStatusCircle) : styles.networkStatusCircle} />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Editing Student with id: {student.id}
                        </h2>
                        <form role="form" className="mb-3 text-center" onSubmit={handleEdit}>
                            <label htmlFor="fist_name" className="form-label">First Name</label>
                            <input type="text" id="fist_name" name="first_name" className="form-control" placeholder="First Name" defaultValue={student.firstName} style={{marginBottom: "10px"}} />

                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Last Name" defaultValue={student.lastName} style={{marginBottom: "10px"}} />

                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Email" defaultValue={student.email} style={{marginBottom: "10px"}} />

                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" id="age" name="age" className="form-control" placeholder="Age" defaultValue={student.age} style={{marginBottom: "10px"}} />

                            <label htmlFor="grade" className="form-label">Grade</label>
                            <input type="number" id="grade" name="grade" className="form-control" placeholder="Grade" defaultValue={student.grade} style={{marginBottom: "10px"}} />

                            <label htmlFor="photo" className="form-label">Photo</label>
                            <input type="file" id="photo" name="photo" className="form-control" style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Edit</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className={styles.imageContainer}>
                <h3>User's Image:</h3>
                <img className={styles.image} src={image} alt="Student Image" />
            </div>

            <div className={styles.center}>
                <button className={styles.downloadButton} onClick={handleDownloadImage}>
                    Download Image
                </button>
            </div>

            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Km</th>
                            <th scope="col">Year</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{(*/}
                        {/*    (() => {*/}
                        {/*        return students.map(s => (*/}
                        {/*            <tr key={s.id}*/}
                        {/*                className={s.grade >= 7 ? "table-success" : (s.grade < 5 ? "table-danger" : "table-warning")}>*/}
                        {/*                <th scope="row">{s.id}</th>*/}
                        {/*                <td>{s.firstName}</td>*/}
                        {/*                <td>{s.lastName}</td>*/}
                        {/*                <td>{s.email}</td>*/}
                        {/*                <td>{s.grade}</td>*/}
                        {/*                <td className="text-center">*/}
                        {/*                    <Link className="btn btn-primary mx-2" to={`/edituser/${s.id}`}>Edit</Link>*/}
                        {/*                    <button className="btn btn-danger mx-2"*/}
                        {/*                            onClick={() => handleDelete(s.id)}>Delete*/}
                        {/*                    </button>*/}
                        {/*                </td>*/}
                        {/*            </tr>*/}
                        {/*        ));*/}
                        {/*    })()*/}
                        {/*)}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default EditUser;
