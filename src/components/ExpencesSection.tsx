import React, { useState } from "react";
import { Expense } from "@/types/Expense.type";

interface ExpencesSectionProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
}

function ExpencesSection({ expenses, onDelete, onEdit }: ExpencesSectionProps) {
  const [activeTab, setActiveTab] = useState<"expenses" | "Chart">("expenses");

  return (
    <div className="w-full">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 w-1/2 ${
            activeTab === "expenses"
              ? "border-b-2 border-blue-500 font-semibold bg-lime-400"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </button>
        <button
          className={`px-4 py-2 w-1/2 ${
            activeTab === "Chart"
              ? "border-b-2 border-blue-500 bg-lime-400 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Chart")}
        >
          Chart (Chart/Graph)
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "expenses" && (
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-gray-600">No expenses yet.</p>
          ) : (
            expenses.map((exp) => (
              <div
                key={exp._id}
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
                    onClick={() => onEdit(exp)}
                    className="text-orange-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => exp._id !== undefined && onDelete(exp._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "Chart" && (
        <div className="p-4 text-gray-600">
          <p>📊 Chart or graph will be displayed here in the Chart.</p>
        </div>
      )}
    </div>
  );
}

export default ExpencesSection;
