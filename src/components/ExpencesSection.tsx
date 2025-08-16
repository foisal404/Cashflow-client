import { Expense } from "@/types/Expense.type";
import React from "react";

interface ExpencesSectionProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

function ExpencesSection({ expenses, onDelete }: ExpencesSectionProps) {
  return (
    <>
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
                  onClick={() => onDelete(exp._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ExpencesSection;
