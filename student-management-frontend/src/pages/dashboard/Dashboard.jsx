import {Fragment, useEffect, useState} from "react";
import AddUserNavbar from "../../layout/AddUserNavbar.jsx";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";
import styles from "./Dashboard.module.css"

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${serverUrl}/api/v1/suspicioususer/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
            console.log(response.data);
        }
        fetchUsers();
    }, []);

    return (
        <Fragment>
            <AddUserNavbar />

            <div className={styles.headerDiv}>
                <h1>Suspicious Users</h1>
            </div>

            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(
                            (() => {
                                return users.map(u => (
                                    <tr key={u.id}>
                                        <th scope="row">{u.id}</th>
                                        <td>{u.firstName}</td>
                                        <td>{u.lastName}</td>
                                        <td>{u.username}</td>
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

export default Dashboard;
