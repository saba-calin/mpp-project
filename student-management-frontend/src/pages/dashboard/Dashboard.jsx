import {Fragment, useEffect, useState} from "react";
import AddUserNavbar from "../../layout/AddUserNavbar.jsx";
import axios from "axios";
import {serverUrl} from "../../serverUrl.js";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${serverUrl}/api/v1/user/suspicious`);
            setUsers(response.data);
            console.log(response.data);
        }
        fetchUsers();
    }, []);

    return (
        <Fragment>
            <AddUserNavbar />

            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">User Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(
                            (() => {
                                return users.map(u => (
                                    <tr key={u.userId}>
                                        <th scope="row">{u.userId}</th>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                        <td>{u.userRole}</td>
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
