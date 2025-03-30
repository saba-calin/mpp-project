import {Fragment, useEffect, useState} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import {Link} from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styles from "./Home.module.css";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/students");
            setStudents(response.data);
        }
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/students/${id}`);
        const fetchStudents = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/students");
            setStudents(response.data);
        }
        fetchStudents();
    }

    const handleDropTable = async () => {
        await axios.delete("http://localhost:8080/api/v1/students/drop-table")
        const fetchStudents = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/students");
            setStudents(response.data);
        }
        fetchStudents();
    }

    const [filterValue, setFilterValue] = useState("");
    const handleFilter = async(str) => {
        const response = await axios.get("http://localhost:8080/api/v1/students");
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
        const response = await axios.get("http://localhost:8080/api/v1/students");
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

    const [elements, setElements] = useState(5);
    const handleChangeElements = (num) => {
        setElements(num);
    }

    const [pages, setPages] = useState(1);
    const handleChangePages = (num) => {
        setPages(num);
    }

    const totalPages = Math.ceil(students.length / elements);
    const paginatedStudents = students.slice((pages - 1) * elements, pages * elements);



    const gradeDistribution = students.reduce(
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

    const [isGenerating, setIsGenerating] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (isGenerating) {
            const id = setInterval(() => {
                const randomFirstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack", "Kathy", "Leo", "Mona", "Nina", "Oscar", "Paul", "Quincy", "Rachel", "Sam", "Tina"];
                const randomLastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Roberts"];

                const firstName = randomFirstNames[Math.floor(Math.random() * randomFirstNames.length)];
                const lastName = randomLastNames[Math.floor(Math.random() * randomLastNames.length)];
                const email = `${firstName}.${lastName}@gmail.com`;
                const grade = Math.floor(Math.random() * 10) + 1;

                const newStudent = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    grade: grade
                };

                axios.post('http://localhost:8080/api/v1/students', newStudent, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const fetchStudents = async () => {
                    const response = await axios.get("http://localhost:8080/api/v1/students");
                    setStudents(response.data);
                }
                fetchStudents();
            }, 10);

            setIntervalId(id);
        }
        else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isGenerating]);

    const toggleGeneration = () => {
        setIsGenerating(prev => !prev);
    };


    return (
        <Fragment>
            <HomeNavbar/>
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
                                const maxGrade = Math.max(...students.map(s => s.grade));
                                const minGrade = Math.min(...students.map(s => s.grade));

                                return paginatedStudents.map(s => (
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
                <div className="dropdown text-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="true">
                        Elements ({elements})
                    </button>
                    <ul className="dropdown-menu">
                        <li className={styles.item} onClick={() => handleChangeElements(5)}>5</li>
                        <li className={styles.item} onClick={() => handleChangeElements(6)}>6</li>
                        <li className={styles.item} onClick={() => handleChangeElements(7)}>7</li>
                        <li className={styles.item} onClick={() => handleChangeElements(8)}>8</li>
                        <li className={styles.item} onClick={() => handleChangeElements(9)}>9</li>
                        <li className={styles.item} onClick={() => handleChangeElements(10)}>10</li>
                    </ul>
                </div>

                <div className="dropdown text-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="true">
                        Page ({pages})
                    </button>
                    <ul className="dropdown-menu">
                        {Array.from({length: totalPages}, (_, index) => (
                            <li key={index + 1} className={styles.item} onClick={() => handleChangePages(index + 1)}>{index + 1}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.paginationButtons}>
                <div className={`${styles.pieChartContainer} text-center py-4`}>
                    <h3>Grade Distribution</h3>
                    <Pie data={pieData} />
                </div>
            </div>

            <div className={`${styles.paginationButtons} ${styles.generateButton}`}>
                <button onClick={toggleGeneration}>
                    {isGenerating ? "Stop Generation" : "Start Generation"}
                </button>
            </div>

            <div className={`${styles.paginationButtons} ${styles.generateButton}`}>
                <button onClick={handleDropTable}>
                    Drop Table
                </button>
            </div>

        </Fragment>
    );
}

export default Home;
