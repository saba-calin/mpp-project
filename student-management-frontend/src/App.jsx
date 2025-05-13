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
import EditCar from "./pages/car/EditCar.jsx";
import Stats from "./pages/stats/Stats.jsx";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Test from "./pages/test/Test.jsx";
import Content from "./pages/test/Content.jsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/test" element={<Test />} />
            <Route exact path="/content" element={<Content />} />
            <Route exact path="/adduser" element={<AddUser />} />
            <Route exact path="/stats" element={<Stats />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/edituser/:id" element={<EditUser />}></Route>
            <Route exact path="/edituser/:id/addcar" element={<AddCar />}></Route>
            <Route exact path="/edituser/:id/editcar/:carId" element={<EditCar />}></Route>

            <Route exact path="*" element={<Login />} />
        </Routes>
    </Router>
  )
}

export default App
