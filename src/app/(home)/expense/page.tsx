"use client";
import ExpencesForm from "@/components/ExpencesForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState<Partial<Expense>>({
    title: "",
    amount: 0,
    category: "Food",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now(),
      title: form.title || "",
      amount: Number(form.amount),
      category: form.category || "Others",
      date: form.date || new Date().toISOString().split("T")[0],
    };
    setExpenses([...expenses, newExpense]);
    setForm({ title: "", amount: 0, category: "Food", date: "" });
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses`, {
            withCredentials: true,
          })
          .then((res) => setExpenses(res.data));
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.message || "Failed to get expense data", {
            type: "error",
          });
        } else {
          toast("An unexpected error occurred", {
            type: "error",
            theme: "dark",
          });
        }
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>

      <ExpencesForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        form={form}
      />

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <p className="text-gray-600">No expenses yet.</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{exp.title}</p>
                <p className="text-sm text-gray-500">
                  {exp.category} • {exp.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">${exp.amount}</span>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
