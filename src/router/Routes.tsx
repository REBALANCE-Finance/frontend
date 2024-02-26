import { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider, ScrollRestoration } from "react-router-dom";

import { PoolsBorrow } from "../feature/Pools/PoolsBorrow";
import { PoolsLending } from "../feature/Pools/PoolsLending";
import { MainLayout } from "../layout/MainLayout";
import { PoolLayout } from "../layout/PoolLayout";
import { NotFound } from "../pages/NotFound";
import { Swap } from "../pages/Swap";
// import { Swap } from "../pages/Swap";

export const routesList = [
  { name: "Lending", path: "/lending" },
  { name: "Borrowing", path: "/borrowing" },
  { name: "Swap", path: "/swap" }
];

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ScrollRestoration />
        <MainLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Navigate to="/lending" />
      },
      {
        element: <PoolLayout />,
        children: [
          {
            path: "/lending",
            element: <PoolsLending />
          },
          {
            path: "/borrowing",
            element: <PoolsBorrow />
          }
        ]
      },
      {
        path: "/swap",
        element: <Swap />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}
