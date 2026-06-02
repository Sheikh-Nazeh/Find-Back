import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import BrowseItems from "../pages/BrowseItems";
import ItemDetails from "../pages/ItemDetails";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ReportItem from "../pages/ReportItem";

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
      </Routes>
    </BrowserRouter>
  );
}