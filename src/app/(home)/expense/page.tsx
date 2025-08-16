"use client";

import { useState } from "react";

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>

      {/* Add Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-white shadow-md p-4 rounded-lg"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title || ""}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount || ""}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Others</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-lime-600 text-white py-2 rounded hover:bg-lime-700"
        >
          Add Expense
        </button>
      </form>

      {/* Expense List */}
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
