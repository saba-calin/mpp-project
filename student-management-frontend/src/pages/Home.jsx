import {Fragment, useEffect, useState} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import {Link, useNavigate} from "react-router-dom";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";
import styles from "./Home.module.css";
import axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {serverUrl} from "../serverUrl.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }

        const data = {
            token: token
        }
        axios.post(`${serverUrl}/api/v1/auth/is-user`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch((error) => {
            navigate("/login");
        });
    }, []);

    const [user, setUser] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);
    const buildOperationLog = (operation, token) => {
        return {
            token: token,
            operation: operation,
            date: new Date()
        };
    }

    const [allStudents, setAllStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${serverUrl}/api/v1/students`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllStudents(response.data);
            calculateGradeDistribution(response.data);
        }
        fetchStudents();
    }, []);

    const [scrollCount, setScrollCount] = useState(1);
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                setScrollCount(prevCount => prevCount + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, []);

    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const count = scrollCount * 5;
            const token = localStorage.getItem("token");
            const response = await axios.get(`${serverUrl}/api/v1/students/pagination?count=${count}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await axios.post(`${serverUrl}/api/v1/logs`, buildOperationLog("get_students", token), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data);
            console.log(response.data);
        }
        fetchStudents();
    }, [scrollCount]);

    const handleDelete = async (id) => {
        if (serverStatus === false || isOnline === false) {
            const deletedStudents = JSON.parse(localStorage.getItem("deleted")) || [];
            deletedStudents.push(id);
            localStorage.setItem("deleted", JSON.stringify(deletedStudents));
            return;
        }

        const token = localStorage.getItem("token");
        await axios.delete(`${serverUrl}/api/v1/students/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await axios.post(`${serverUrl}/api/v1/logs`, buildOperationLog("delete_students", token), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const fetchStudents = async () => {
            const count = scrollCount * 5;
            const response = await axios.get(`${serverUrl}/api/v1/students/pagination?count=${count}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data);
            calculateGradeDistribution(response.data);
        }
        fetchStudents();
    }

    const handleDropStudentsTable = async () => {
        const token = localStorage.getItem("token");
        await axios.delete(`${serverUrl}/api/v1/students/drop-table`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const fetchStudents = async () => {
            const response = await axios.get(`${serverUrl}/api/v1/students`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data);
            calculateGradeDistribution(response.data);
        }
        fetchStudents();
    }
    const handleDropCarsTable = async () => {
        const token = localStorage.getItem("token");
        await axios.delete(`${serverUrl}/api/v1/cars/drop-table`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const fetchStudentsForPieChart = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${serverUrl}/api/v1/students`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        calculateGradeDistribution(response.data);
    }
    const fetchStudentsForDisplay = async () => {
        const token = localStorage.getItem("token");
        const count = scrollCount * 5;
        const response = await axios.get(`${serverUrl}/api/v1/students/pagination?count=${count}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setStudents(response.data);
    }
    const syncDeletedStudents = async () => {
        const token = localStorage.getItem("token");
        const deletedStudents = JSON.parse(localStorage.getItem("deleted")) || [];
        let deleted = false;

        for (const entry of deletedStudents) {
            deleted = true;
            await axios.delete(`${serverUrl}/api/v1/students/${entry}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        localStorage.removeItem("deleted");

        if (deleted === true) {
            fetchStudentsForDisplay();
            fetchStudentsForPieChart();
            alert("Synced deleted students");
        }
    }
    const syncUpdatedStudents = async () => {
        const token = localStorage.getItem("token");
        const updatedStudents = JSON.parse(localStorage.getItem("updated")) || [];
        let updated = false;

        for (const entry of updatedStudents) {
            updated = true;
            const formData = new FormData();
            formData.append('student', JSON.stringify(entry.student));

            if (entry.photo) {
                const res = await fetch(entry.photo);
                const blob = await res.blob();
                formData.append('photo', blob, 'image.jpg');
            }

            await axios.put(`${serverUrl}/api/v1/students`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        localStorage.removeItem("updated")

        if (updated === true) {
            fetchStudentsForDisplay();
            fetchStudentsForPieChart();
            alert("Synced updated students");
        }
    }
    const syncAddedStudents = async () => {
        const token = localStorage.getItem("token");
        const addedStudents = JSON.parse(localStorage.getItem("added")) || [];
        let added = false;

        for (const entry of addedStudents) {
            added = true;
            const formData = new FormData();
            formData.append('student', JSON.stringify(entry.student));

            if (entry.photo) {
                const res = await fetch(entry.photo);
                const blob = await res.blob();
                formData.append('photo', blob, 'image.jpg');
            }

            await axios.post(`${serverUrl}/api/v1/students`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        localStorage.removeItem("added");

        if (added === true) {
            fetchStudentsForDisplay();
            fetchStudentsForPieChart();
            alert("Synced added students");
        }
    }
    const syncLocalEdits = async () => {
        syncDeletedStudents();
        syncUpdatedStudents();
        syncAddedStudents();
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
                const token = localStorage.getItem("token");
                axios.get(`${serverUrl}/api/health`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    syncLocalEdits();
                    setServerStatus(true);
                })
                .catch(() => {
                    setServerStatus(false);
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isOnline]);

    const [filterValue, setFilterValue] = useState("");
    const handleFilter = async(str) => {
        const token = localStorage.getItem("token");
        const count = scrollCount * 5;
        const response = await axios.get(`${serverUrl}/api/v1/students/pagination?count=${count}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (str === "") {
            const newStudents = response.data;

            if (order === "asc") {
                newStudents.sort((a, b) => a.grade - b.grade);
            }
            else if (order === "desc") {
                newStudents.sort((a, b) => b.grade - a.grade);
            }

            setStudents(newStudents);
            return;
        }

        const temp = response.data;
        const newStudents = temp.filter(s => s.firstName.toLowerCase().includes(str.toLowerCase()));

        if (order === "asc") {
            newStudents.sort((a, b) => a.grade - b.grade);
        }
        else if (order === "desc") {
            newStudents.sort((a, b) => b.grade - a.grade);
        }

        setStudents(newStudents);
    }

    const [order, setOrder] = useState("neutral");
    const changeOrder = async () => {
        const token = localStorage.getItem("token");
        const count = scrollCount * 5;
        const response = await axios.get(`${serverUrl}/api/v1/students/pagination?count=${count}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setOrder((prevOrder) => {
            let newOrder = prevOrder;
            let sortedStudents = response.data;

            switch (prevOrder) {
                case "neutral":
                    newOrder = "asc";
                    sortedStudents.sort((a, b) => a.grade - b.grade);

                    break;
                case "asc":
                    newOrder = "desc";
                    sortedStudents.sort((a, b) => b.grade - a.grade);

                    break;
                case "desc":
                    newOrder = "neutral";
                    const temp = response.data;
                    sortedStudents = temp.filter(s => s.firstName.toLowerCase().includes(filterValue.toLowerCase()));

                    break;
            }

            setStudents(sortedStudents);
            return newOrder;
        });
    }


    const [gradeDistribution, setGradeDistribution] = useState({ low: 0, average: 0, high: 0 });
    const calculateGradeDistribution = (students) => {
        const distribution = students.reduce(
            (acc, student) => {
                if (student.grade >= 7) {
                    acc.high++;
                } else if (student.grade >= 5) {
                    acc.average++;
                } else {
                    acc.low++;
                }
                return acc;
            },
            { low: 0, average: 0, high: 0 }
        );
        setGradeDistribution(distribution);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const socket = new SockJS(`${serverUrl}/ws`);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/gradeDistribution", () => {
                const fetchStudents = async () => {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`${serverUrl}/api/v1/students`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    calculateGradeDistribution(response.data);
                }
                fetchStudents();
            });
        });
    }, []);

    const pieData = {
        labels: ['Low (Below 5)', 'Average (5-6)', 'High (7 and above)'],
        datasets: [
            {
                data: [gradeDistribution.low, gradeDistribution.average, gradeDistribution.high],
                backgroundColor: ['#FF6384', '#FFCD56', '#9aeb36'],
                hoverBackgroundColor: ['#FF6384', '#FFCD56', '#9aeb36'],
            },
        ],
    };


    const [isTaskRunning, setIsTaskRunning] = useState(false);
    const handleTaskButton = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${serverUrl}/api/v1/students/startStopTask`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data === "Task started") {
            setIsTaskRunning(true);
        }
        else {
            setIsTaskRunning(false);
        }
    }
    useEffect(() => {
        const getTaskStatus = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${serverUrl}/api/v1/students/getTaskStatus`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data === "Task is running") {
                setIsTaskRunning(true);
            }
            else {
                setIsTaskRunning(false);
            }
        }
        getTaskStatus();
    }, []);

    return (
        <Fragment>
            <HomeNavbar/>

            <div className={styles.statusContainer}>
                <p>Status: {isOnline ? (serverStatus ? "Online" : "Server Down") : "Network Down"}</p>
                <div className={isOnline ? (serverStatus ? styles.onlineStatusCircle : styles.offlineStatusCircle) : styles.networkStatusCircle} />
            </div>

            <div className="text-center" style={{marginTop: "10px"}}>
                <label htmlFor="filter" style={{marginRight: "10px"}}>Filter By First Name:</label>
                <input type="text" name="filter" id="filter" style={{marginRight: "10px"}} onChange={(e) => {
                    setFilterValue(e.target.value);
                    handleFilter(e.target.value)
                }}/>
            </div>

            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">
                                Grade
                                <button className="btn border-0" onClick={changeOrder}>
                                    {order === "neutral" ? "↑↓" : (order === "asc" ? "↑" : "↓")}
                                </button>
                            </th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(
                            (() => {
                                return students.map(s => (
                                    <tr key={s.id}
                                        className={s.grade >= 7 ? "table-success" : (s.grade < 5 ? "table-danger" : "table-warning")}>
                                        <th scope="row">{s.id}</th>
                                        <td>{s.firstName}</td>
                                        <td>{s.lastName}</td>
                                        <td>{s.email}</td>
                                        <td>{s.grade}</td>
                                        <td className="text-center">
                                            <Link className="btn btn-primary mx-2" to={`/edituser/${s.id}`}>Edit</Link>
                                            <button className="btn btn-danger mx-2"
                                                    onClick={() => handleDelete(s.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ));
                            })()
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={styles.paginationButtons}>
                <div className={`${styles.pieChartContainer} text-center py-4`}>
                    <h3>Grade Distribution</h3>
                    <Pie data={pieData} />
                </div>
            </div>

            <div className={`${styles.paginationButtons} ${styles.generateButton}`}>
                <button onClick={handleTaskButton}>
                    {isTaskRunning ? "Stop Generation" : "Start Generation"}
                </button>
            </div>

            {/*<div className={`${styles.paginationButtons} ${styles.dropTableButton}`}>*/}
            {/*    <button onClick={handleDropStudentsTable}>*/}
            {/*        Drop Students Table*/}
            {/*    </button>*/}
            {/*    <button onClick={handleDropCarsTable}>*/}
            {/*        Drop Cars Table*/}
            {/*    </button>*/}
            {/*</div>*/}

        </Fragment>
    );
}

export default Home;
