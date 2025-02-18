import { ROUTE_PATHS } from "@/consts";

export const routesList = [
  { name: "Earn", path: ROUTE_PATHS.lending },
  // { name: "Borrowing", path: ROUTE_PATHS.borrowing },
  { name: "Swap", path: ROUTE_PATHS.swap },
  { name: "Vaults", path: ROUTE_PATHS.vaults },
  {
    name: "Documentation",
    path: "https://rebalance.gitbook.io/rebalance/intro/what-is-rebalance",
    target: "_blank"
  }
  // { name: "DAO", path: "/" }
];
