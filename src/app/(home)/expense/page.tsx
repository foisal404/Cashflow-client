"use client";
import ExpencesForm from "@/components/ExpencesForm";
import ExpencesSection from "@/components/ExpencesSection";
import { Expense } from "@/types/Expense.type";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ininitialValue = {
  title: "",
  amount: 0,
  category: "Food",
  date: "",
};
export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState<Partial<Expense>>(ininitialValue);
  const [update, setupdateExpense] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      title: form.title || "",
      amount: Number(form.amount),
      category: form.category || "Others",
      date: form.date || new Date().toISOString().split("T")[0],
    };

    if (update) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${form._id}`,
          form,
          { withCredentials: true }
        );
        const newExpences = expenses.filter((ex) => ex._id !== form._id);
        setExpenses([newExpense, ...newExpences]);
        setForm({ title: "", amount: 0, category: "Food", date: "" });
        setIsModalOpen(false);
        toast("Expense Edited ", { type: "success" });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.message || "Failed to create expense", {
            type: "error",
          });
        } else {
          toast("An unexpected error occurred", { type: "error" });
        }
      }
    } else {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/expenses`,
          newExpense,
          { withCredentials: true }
        );
        setExpenses([newExpense, ...expenses]);
        setForm({ title: "", amount: 0, category: "Food", date: "" });
        setIsModalOpen(false); // close modal after submission
        toast("Expense added successfully!", { type: "success" });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.message || "Failed to create expense", {
            type: "error",
          });
        } else {
          toast("An unexpected error occurred", { type: "error" });
        }
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          setExpenses(expenses.filter((exp) => exp._id !== id));
        });
      toast("Expense Delete successfully!", { type: "success" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.message || "Failed to delete expense", {
          type: "error",
        });
      } else {
        toast("An unexpected error occurred", { type: "error" });
      }
    }
  };
  const handleEdit = (data: Expense) => {
    setForm(data);
    setupdateExpense(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/expenses`,
          { withCredentials: true }
        );
        setExpenses(res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.message || "Failed to get expense data", {
            type: "error",
          });
        } else {
          toast("An unexpected error occurred", { type: "error" });
        }
      }
    };
    fetchExpenses();
  }, [expenses]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setupdateExpense(false);
          }}
          className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition"
        >
          + Add Expense
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setForm(ininitialValue);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              {update ? "Edit Expense" : "Add Expense"}
            </h2>
            <ExpencesForm
              onSubmit={handleSubmit}
              onChange={handleChange}
              form={form}
              update={update}
            />
          </div>
        </div>
      )}

      <ExpencesSection
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
