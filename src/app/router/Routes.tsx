import { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider, ScrollRestoration } from "react-router-dom";

import { MainLayout } from "../../layout/MainLayout";
import { PoolLayout } from "../../layout/PoolLayout";
import { NotFound } from "../../pages/NotFound";
import { PoolsBorrow } from "../../pages/Pools/PoolsBorrow";
import { PoolsLending } from "../../pages/Pools/PoolsLending";

export const routesList = [
  { name: "Lending", path: "/lending" },
  { name: "Borrowing", path: "/borrowing" }
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
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}
