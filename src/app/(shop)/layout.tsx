export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-blue-600 min-h-screen">{children}</main>;
}
