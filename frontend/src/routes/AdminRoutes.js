import React from "react";
import { Route, Routes } from "react-router-dom";
import { vehicle } from "../pages/AdminPages/vehicles/vehicle";
import { ListComponent } from "../pages/AdminPages/users/ListComponent";
import { AdminLayouts } from "../layouts/AdminLayouts/AdminLayouts";

export const AdminRoutes = () => {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }
    return (
        <Routes>
            <>
                <Route path="/admin/users" element={loadLayout(AdminLayouts, ListComponent)} />
                <Route path="/admin/vehicles" element={loadLayout(vehicle)} />
            </>
        </Routes>
    )
}