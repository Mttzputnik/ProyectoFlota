import React from "react";
import { Route, Routes } from "react-router-dom";
import { Vehicle } from "../pages/AdminPages/vehicles/vehicle";
import { ListComponent } from "../pages/AdminPages/users/ListComponent";
import { AdminLayouts } from "../layouts/AdminLayouts/AdminLayouts";
import { ListVehicles } from "../pages/AdminPages/vehicles/ListVehicle";
import { AddVehicle } from "../pages/AdminPages/vehicles/AddVehicle";
import { ListTrips } from "../pages/AdminPages/trips/ListTrips";
import LoginForm  from "../pages/AdminPages/login/LoginForm";
import IndexForm  from "../pages/AdminPages/index/Index";
import SignupForm  from "../pages/AdminPages/login/SignupForm";
import { ListTires } from "../pages/AdminPages/tires/ListTires";



export const AdminRoutes = () => {
    return (
        <Routes>
            
            <Route path="/admin/users" element={<AdminLayouts><ListComponent /></AdminLayouts>} />
            <Route path="/admin/vehicles" element={<AdminLayouts><Vehicle /></AdminLayouts>} />
            <Route path="/admin/listVehicles" element={<AdminLayouts><ListVehicles /></AdminLayouts>} />
            <Route path="/admin/addVehicles" element={<AdminLayouts><AddVehicle /></AdminLayouts>} />
            <Route path="/admin/ListTrips" element={<AdminLayouts><ListTrips /></AdminLayouts>} />
            <Route path="/admin/ListTires" element={<AdminLayouts><ListTires /></AdminLayouts>} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/"aaaaaaa element={<IndexForm />} />
        </Routes>
    )
}
