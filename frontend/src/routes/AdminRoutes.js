import React from "react";
import { Route, Routes } from "react-router-dom";
import { ListTasks } from "../pages/AdminPages/tasks/ListTask";
import { ListUsers } from "../pages/AdminPages/users/ListUsers";
import { AdminLayouts } from "../layouts/AdminLayouts/AdminLayouts";
import { ListVehicles } from "../pages/AdminPages/vehicles/ListVehicle";
import { AddVehicle } from "../pages/AdminPages/vehicles/AddVehicle";
import { ListTrips } from "../pages/AdminPages/trips/ListTrips";
import { ListTires } from "../pages/AdminPages/tires/ListTires";
import LoginForm  from "../pages/AdminPages/login/LoginForm";
import SignupForm  from "../pages/AdminPages/login/SignupForm";




export const AdminRoutes = () => {
    return (
        <Routes>
            
            <Route path="/admin/ListUsers" element={<AdminLayouts><ListUsers /></AdminLayouts>} />
            <Route path="/admin/ListTasks" element={<AdminLayouts><ListTasks /></AdminLayouts>} />
            <Route path="/admin/listVehicles" element={<AdminLayouts><ListVehicles /></AdminLayouts>} />
            <Route path="/admin/addVehicles" element={<AdminLayouts><AddVehicle /></AdminLayouts>} />
            <Route path="/admin/ListTrips" element={<AdminLayouts><ListTrips /></AdminLayouts>} />
            <Route path="/admin/ListTires" element={<AdminLayouts><ListTires /></AdminLayouts>} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={<LoginForm />} />
        </Routes>
    )
}
