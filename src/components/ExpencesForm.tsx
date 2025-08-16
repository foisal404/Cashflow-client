import React from "react";

interface ExpencesFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  form: {
    title?: string;
    amount?: number | string;
    category?: string;
    date?: string;
  };
}

function ExpencesForm({ onSubmit, onChange, form }: ExpencesFormProps) {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="space-y-4 mb-8 bg-white shadow-md p-4 rounded-lg"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title || ""}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount || ""}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={onChange}
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
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-lime-600 text-white py-2 rounded hover:bg-lime-700"
        >
          Add Expense
        </button>
      </form>
    </>
  );
}

export default ExpencesForm;
