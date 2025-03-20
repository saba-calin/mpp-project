import {Fragment, useEffect, useState} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import {Link} from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styles from "./Home.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        setStudents(JSON.parse(localStorage.getItem("students")) ?? []);
    }, []);

    const handleDelete = (id) => {
        const newStudents = students.filter(s => s.id !== id);
        setStudents(newStudents);
        localStorage.setItem("students", JSON.stringify(newStudents));
    }

    const [filterValue, setFilterValue] = useState("");
    const handleFilter = (str) => {
        // console.log(str);

        if (str === "") {
            const newStudents = JSON.parse(localStorage.getItem("students")) ?? [];

            if (order === "asc") {
                newStudents.sort((a, b) => a.grade - b.grade);
                console.log("fds");
            }
            else if (order === "desc") {
                newStudents.sort((a, b) => b.grade - a.grade);
            }

            setStudents(newStudents);
            return;
        }

        const temp = JSON.parse(localStorage.getItem("students")) ?? [];
        const newStudents = temp.filter(s => s.first_name.toLowerCase().includes(str.toLowerCase()));

        if (order === "asc") {
            newStudents.sort((a, b) => a.grade - b.grade);
        }
        else if (order === "desc") {
            newStudents.sort((a, b) => b.grade - a.grade);
        }

        setStudents(newStudents);
    }

    const [order, setOrder] = useState("neutral");
    const changeOrder = () => {
        setOrder((prevOrder) => {
            let sortedStudents = [...students];
            let newOrder = prevOrder;

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
                    const temp = JSON.parse(localStorage.getItem("students")) ?? [];
                    sortedStudents = temp.filter(s => s.first_name.toLowerCase().includes(filterValue.toLowerCase()));

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



    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomFirstNames = [
                "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack",
                "Kathy", "Leo", "Mona", "Nina", "Oscar", "Paul", "Quincy", "Rachel", "Sam", "Tina"
            ];
            const randomLastNames = [
                "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Roberts"
            ];

            const id = Date.now();
            const fistName = randomFirstNames[Math.floor(Math.random() * randomFirstNames.length)];
            const lastName = randomLastNames[Math.floor(Math.random() * randomLastNames.length)];
            const email = `${fistName}.${lastName}@gmail.com`;
            const grade = Math.floor(Math.random() * 10) + 1;

            const newStudent = {
                id: id,
                first_name: fistName,
                last_name: lastName,
                email: email,
                grade: grade
            };

            setStudents(prevStudents => {
                const updatedStudents = [...prevStudents, newStudent];
                localStorage.setItem("students", JSON.stringify(updatedStudents));
                return updatedStudents;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Fragment>
            <HomeNavbar/>
            <div className="text-center" style={{marginTop: "10px"}}>
                <label htmlFor="filter" style={{marginRight: "10px"}}>Filter By First Name:</label>
                <input type="text" name="filter" id="filter" style={{marginRight: "10px"}} onChange={(e) => {
                    setFilterValue(e.target.value);
                    handleFilter(e.target.value)
                }}/>
                {/*<button onClick={() => handleFilter(filterValue)}>Filter</button>*/}
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

                                // table-success
                                // table-danger
                                return paginatedStudents.map(s => (
                                    <tr key={s.id}
                                        className={s.grade >= 7 ? "table-success" : (s.grade < 5 ? "table-danger" : "table-warning")}>
                                        <th scope="row">{s.id}</th>
                                        <td>{s.first_name}</td>
                                        <td>{s.last_name}</td>
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

        </Fragment>
    );
}

export default Home;
