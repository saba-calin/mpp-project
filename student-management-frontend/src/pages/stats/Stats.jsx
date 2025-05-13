import {Fragment, useEffect, useState} from "react";
import AddUserNavbar from "../../layout/AddUserNavbar.jsx";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";
import styles from "./Stats.module.css";

const Stats = () => {
    const [token, setToken] = useState("");
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const [students, setStudents] = useState([]);
    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchStudents = async () => {
            const response = await axios.get(`${serverUrl}/api/v1/students/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data);
            console.log(response.data);
        }
        fetchStudents();
    }, [token]);

    return (
        <Fragment>
            <AddUserNavbar />

            <div className={styles.headerDiv}>
                <h1>Displaying the total number of kilometers for students with cars newer than 2020</h1>
            </div>

            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Kilometers</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(
                            (() => {
                                return students.map(s => (
                                    <tr key={s.studentId}>
                                        <th scope="row">{s.studentId}</th>
                                        <td>{s.firstName}</td>
                                        <td>{s.lastName}</td>
                                        <td>{s.totalKm}</td>
                                    </tr>
                                ));
                            })()
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default Stats;
