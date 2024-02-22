import { Borrow } from "../pages/Borrow";
import { Lending } from "../pages/Lending";
import { NotFound } from "../pages/NotFound";
import { Swap } from "../pages/Swap";
import { Navigate, Route, Routes } from "react-router-dom";

export const routesList = [
  { name: "Lending", path: "/lending" },
  { name: "Borrowing", path: "/borrow" }
];

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lending" />} />
      <Route path="/lending" element={<Lending />} />

      <Route path="/borrow" element={<Borrow />} />

      <Route path="/swap" element={<Swap />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
