import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import BrowseItems from "../pages/BrowseItems";
import ItemDetails from "../pages/ItemDetails";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ReportItem from "../pages/ReportItem";
import Dashboard from "../components/admin/Dashboard";
import ManageUsers from "../components/admin/ManageUsers";
import ManageItems from "../components/admin/ManageItems";
import ManageReports from "../components/admin/ManageReports";
import ManageClaims from "../components/admin/ManageClaims";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseItems />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/items" element={<ManageItems />} />
        <Route path="/admin/reports" element={<ManageReports />} />
        <Route path="/admin/claims" element={<ManageClaims />} />
      </Routes>
    </BrowserRouter>
  );
}