import {Fragment, useEffect, useState} from "react";
import AddUserNavbar from "../layout/AddUserNavbar.jsx";
import {useLocalStorage} from "../useLocalStorage.js";
import axios from "axios";
import styles from "./AddUser.module.css";
import {serverUrl} from "../serverUrl.js";

export const getId = () => {
    const students = JSON.parse(localStorage.getItem('students')) ?? [];

    let id = 0;
    for (const student of students) {
        if (Number(student.id) > id) {
            id = Number(student.id);
        }
    }
    return id + 1;
}

const AddUser = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);
    const buildOperationLog = (operation) => {
        return {
            userId: user.id,
            operation: operation,
            date: new Date()
        };
    }

    const handleSubmit = (eventObj) => {
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
            firstName: formattedData.first_name,
            lastName: formattedData.last_name,
            email: formattedData.email,
            age: formattedData.age,
            grade: formattedData.grade
        }

        if (serverStatus === false || isOnline === false) {
            const addedStudents = JSON.parse(localStorage.getItem("added")) || [];

            const reader = new FileReader();
            reader.onload = () => {
                const base64Photo = reader.result;

                const newStudent = {
                    student,
                    photo: base64Photo
                };

                addedStudents.push(newStudent);
                localStorage.setItem("added", JSON.stringify(addedStudents));
            };

            if (formattedData.photo.size !== 0) {
                reader.readAsDataURL(formattedData.photo);
            }
            else {
                const newStudent = {
                    student,
                    photo: ""
                };
                addedStudents.push(newStudent);
                localStorage.setItem("added", JSON.stringify(addedStudents));
            }

            return;
        }

        const formData = new FormData();
        formData.append('student', JSON.stringify(student));
        formData.append('photo', formattedData.photo);

        axios.post(`${serverUrl}/api/v1/students`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        axios.post(`${serverUrl}/api/v1/logs`, buildOperationLog("post_students"));
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
                console.log(isOnline);
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
            <AddUserNavbar />

            <div className={styles.statusContainer}>
                <p>Status: {isOnline ? (serverStatus ? "Online" : "Server Down") : "Network Down"}</p>
                <div className={isOnline ? (serverStatus ? styles.onlineStatusCircle : styles.offlineStatusCircle) : styles.networkStatusCircle} />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center">
                            Enter a new Student
                        </h2>
                        <form role="form" className="mb-3 text-center" onSubmit={handleSubmit}>
                            <label htmlFor="fist_name" className="form-label">First Name</label>
                            <input type="text" id="fist_name" name="first_name" className="form-control" placeholder="First Name" style={{marginBottom: "10px"}} />

                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Last Name" style={{marginBottom: "10px"}} />

                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Email" style={{marginBottom: "10px"}} />

                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" id="age" name="age" className="form-control" placeholder="Age" style={{marginBottom: "10px"}} />

                            <label htmlFor="grade" className="form-label">Grade</label>
                            <input type="number" id="grade" name="grade" className="form-control" placeholder="Grade" style={{marginBottom: "10px"}} />

                            <label htmlFor="photo" className="form-label">Photo</label>
                            <input type="file" id="photo" name="photo" className="form-control" style={{marginBottom: "50px"}} />

                            <button type="submit" className="btn btn-outline-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AddUser;
