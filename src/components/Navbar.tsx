"use client";

import Link from "next/link";

export default function Navbar() {
  // const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-lime-400">
          CashFlow
        </Link>

        <div className="flex space-x-6">
          {/* {!user ? (
            <>
              <Link href="/" className="hover:text-lime-400">
                Home
              </Link>
              <Link href="/learn-more" className="hover:text-lime-400">
                Learn More
              </Link>
              <Link href="/login" className="hover:text-lime-400">
                Login
              </Link>
              <Link href="/register" className="hover:text-lime-400">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/expense" className="hover:text-lime-400">
                Expense
              </Link>
              <button onClick={logout} className="hover:text-red-400">
                Logout
              </button>
            </>
          )} */}
        </div>
      </div>
    </nav>
  );
}
