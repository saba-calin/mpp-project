import {Fragment, useEffect, useState} from "react";
import HomeNavbar from "../layout/HomeNavbar.jsx";
import {Link} from "react-router-dom";

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

    return (
        <Fragment>
            <HomeNavbar />
            <div className="text-center" style={{marginTop: "10px"}}>
                <label htmlFor="filter" style={{marginRight: "10px"}}>Filter By First Name:</label>
                <input type="text" name="filter" id="filter" style={{marginRight: "10px"}} onChange={(e) => {setFilterValue(e.target.value); handleFilter(e.target.value)}}/>
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
                            {students.map(s => (
                                <tr key={s.id}>
                                    <th scope="row">{s.id}</th>
                                    <td>{s.first_name}</td>
                                    <td>{s.last_name}</td>
                                    <td>{s.email}</td>
                                    <td>{s.grade}</td>
                                    <td className="text-center">
                                        {/*<button className="btn btn-primary mx-2">View</button>*/}
                                        <Link className="btn btn-primary mx-2" to={`/edituser/${s.id}`}>Edit</Link>
                                        <button className="btn btn-danger mx-2" onClick={() => handleDelete(s.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
