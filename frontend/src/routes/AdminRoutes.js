import React from "react";
import { Route, Routes } from "react-router-dom";
import { Vehicle } from "../pages/AdminPages/vehicles/vehicle";
import { ListComponent } from "../pages/AdminPages/users/ListComponent";
import { AdminLayouts } from "../layouts/AdminLayouts/AdminLayouts";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/users" element={<AdminLayouts><ListComponent /></AdminLayouts>} />
            <Route path="/admin/vehicles" element={<AdminLayouts><Vehicle /></AdminLayouts>} />
        </Routes>
    )
}
