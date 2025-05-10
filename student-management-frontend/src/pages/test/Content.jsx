import {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Content = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:8080/is-authenticated", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(() => {
            navigate("/test");
        });

        fetchUserData();
        fetchAdminData();
    }, []);

    const [userData, setUserData] = useState([]);
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get("http://localhost:8080/demo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) =>{
            console.log(error);
        });
        setUserData(userResponse.data);
    }

    const [adminData, setAdminData] = useState([]);
    const fetchAdminData = async () => {
        const token = localStorage.getItem("token");
        const adminResponse = await axios.get("http://localhost:8080/admin", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) =>{
            setAdminData("not authorized");
            console.log(error);
        });
        setAdminData(adminResponse.data);
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/test");
    }

    return (
        <Fragment>
            <button onClick={handleLogOut}>Log Out</button>

            <h1>User Data:</h1>
            <p>{userData}</p>

            <h1>Admin Data:</h1>
            <p>{adminData}</p>
        </Fragment>
    );
}

export default Content;
