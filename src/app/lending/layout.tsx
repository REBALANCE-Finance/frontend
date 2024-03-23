import { PoolLayout } from "@/layout/PoolLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PoolLayout>
      {children}
    </PoolLayout>
  )
}