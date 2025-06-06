export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-between">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
}
