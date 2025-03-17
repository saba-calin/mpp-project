import {Fragment} from "react";
import Home from "./pages/Home.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import HomeNavbar from "./layout/HomeNavbar.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/adduser" element={<AddUser />} />
            <Route exact path="/edituser/:id" element={<EditUser />}></Route>
        </Routes>
    </Router>
  )
}

export default App
