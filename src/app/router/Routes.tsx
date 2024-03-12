import { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider, ScrollRestoration } from "react-router-dom";

import { ROUTE_PATHS } from "../../consts";
import { AssetLayout } from "../../layout/AssetLayout";
import { MainLayout } from "../../layout/MainLayout";
import { PoolLayout } from "../../layout/PoolLayout";
import { BorrowAsset } from "../../pages/AssetsPages/BorrowAsset";
import { LendingAsset } from "../../pages/AssetsPages/LendingAsset";
import { NotFound } from "../../pages/NotFound";
import { PoolsBorrow } from "../../pages/Pools/PoolsBorrow";
import { PoolsLending } from "../../pages/Pools/PoolsLending";

export const routesList = [
  { name: "Lending", path: ROUTE_PATHS.lending },
  { name: "Borrowing", path: ROUTE_PATHS.borrowing },
  // { name: "Swap", path: "/" },
  { name: "Documentation", path: "/" },
  { name: "DAO", path: "/" }
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
        element: <AssetLayout />,
        children: [
          {
            path: ROUTE_PATHS.lendingAsset,
            element: <LendingAsset />
          },
          {
            path: ROUTE_PATHS.borrowingAsset,
            element: <BorrowAsset />
          }
        ]
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}
