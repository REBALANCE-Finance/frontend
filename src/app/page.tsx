import { ROUTE_PATHS } from "@/consts";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTE_PATHS.lending);
}
