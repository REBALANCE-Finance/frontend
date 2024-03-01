import { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider, ScrollRestoration } from "react-router-dom";

import { ROUTE_PATHS } from "../../consts";
import { MainLayout } from "../../layout/MainLayout";
import { PoolLayout } from "../../layout/PoolLayout";
import { LendingAsset } from "../../pages/LendingAsset";
import { NotFound } from "../../pages/NotFound";
import { PoolsBorrow } from "../../pages/Pools/PoolsBorrow";
import { PoolsLending } from "../../pages/Pools/PoolsLending";

export const routesList = [
  { name: "Lending", path: ROUTE_PATHS.lending },
  { name: "Borrowing", path: ROUTE_PATHS.borrowing }
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
        element: <Navigate to={ROUTE_PATHS.lending} />
      },
      {
        element: <PoolLayout />,
        children: [
          {
            path: ROUTE_PATHS.lending,
            element: <PoolsLending />
          },
          {
            path: ROUTE_PATHS.borrowing,
            element: <PoolsBorrow />
          }
        ]
      },
      {
        path: ROUTE_PATHS.lendingAsset,
        element: <LendingAsset />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}
