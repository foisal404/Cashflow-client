"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<boolean | null>(null);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        { withCredentials: true }
      );
      if (res.data) setUser(true);
    } catch {
      setUser(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(false);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-lime-400">
          CashFlow
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-lime-400">
            Home
          </Link>
          <Link href="/learn-more" className="hover:text-lime-400">
            Learn More
          </Link>

          {!user ? (
            <>
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
              <button
                onClick={logout}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-lime-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-700 px-6 py-4 space-y-4">
          <Link
            href="/"
            className="block hover:text-lime-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/learn-more"
            className="block hover:text-lime-400"
            onClick={() => setIsOpen(false)}
          >
            Learn More
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="block hover:text-lime-400"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block hover:text-lime-400"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/expense"
                className="block hover:text-lime-400"
                onClick={() => setIsOpen(false)}
              >
                Expense
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block text-left w-full hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
