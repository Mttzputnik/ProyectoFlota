import React from "react";
import { Route, Routes } from "react-router-dom";
import { Vehicle } from "../pages/AdminPages/vehicles/vehicle";
import { ListComponent } from "../pages/AdminPages/users/ListComponent";
import { AdminLayouts } from "../layouts/AdminLayouts/AdminLayouts";
import { ListVehicles } from "../pages/AdminPages/vehicles/ListVehicle";
import { AddVehicle } from "../pages/AdminPages/vehicles/AddVehicle";
import LoginForm  from "../pages/AdminPages/login/LoginForm";
import SignupForm  from "../pages/AdminPages/login/SignupForm";


export const AdminRoutes = () => {
    return (
        <Routes>
            
            <Route path="/admin/users" element={<AdminLayouts><ListComponent /></AdminLayouts>} />
            <Route path="/admin/vehicles" element={<AdminLayouts><Vehicle /></AdminLayouts>} />
            <Route path="/admin/listVehicles" element={<AdminLayouts><ListVehicles /></AdminLayouts>} />
            <Route path="/admin/addVehicles" element={<AdminLayouts><AddVehicle /></AdminLayouts>} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={<LoginForm />} />
        </Routes>
    )
}
