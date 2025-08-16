import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export default function ExpenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
