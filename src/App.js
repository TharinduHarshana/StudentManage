import React from "react";
import { BrowserRouter, Routes, Route, Navigate, RouterProvider, Router } from "react-router-dom";

import AddUser from "./Components/AddUser";
import AddStudent from "./Components/AddNewStudent";
import ShowStudentDetails from "./Components/ShowStudentDetails";
import Login from "./Components/Login";
import Home from "./Pages/UserDashbord";
import AdminDashBoard from "./Pages/AdminDashboard";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<ShowStudentDetails />} />
            <Route path="/" element={<Login />} />
            <Route path="/db-manager-dashboard" element={<Home />} />
            <Route path="/admin-dashboard" element={<AdminDashBoard />} />
            
        </Routes>
        </BrowserRouter>
    );
    }

export default App;