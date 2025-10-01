import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    type: 'income' | 'expense';
    category: string;
    amount: number;
    description: string;
  }) => void;
}

const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
const expenseCategories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Other'];

export default function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !amount || parseFloat(amount) <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    onAddTransaction({
      type,
      category,
      amount: parseFloat(amount),
      description
    });

    setCategory('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md p-6 mb-8 border border-neutral-800 text-gray-100">
      <h2 className="text-xl font-bold text-gray-100 mb-6">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              type === 'income'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 border border-neutral-700'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              type === 'expense'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 border border-neutral-700'
            }`}
          >
            Expense
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-700 bg-neutral-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount *
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 border border-neutral-700 bg-neutral-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            className="w-full px-4 py-2 border border-neutral-700 bg-neutral-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
      </form>
    </div>
  );
}
