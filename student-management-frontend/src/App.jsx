import {Fragment} from "react";
import {arr} from "./assets/students.js";
import Home from "./pages/Home.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import HomeNavbar from "./layout/HomeNavbar.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import AddCar from "./pages/car/AddCar.jsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/adduser" element={<AddUser />} />
            <Route exact path="/edituser/:id" element={<EditUser />}></Route>
            <Route exact path="/edituser/:id/addcar" element={<AddCar />}></Route>
        </Routes>
    </Router>
  )
}

export default App
