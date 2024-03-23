import { AssetLayout } from "@/layout/AssetLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AssetLayout>
      {children}
    </AssetLayout>
  )
}