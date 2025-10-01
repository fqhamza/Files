import { useState } from 'react';
import { Settings, Save } from 'lucide-react';

interface SettingsPanelProps {
  initialBalance: number;
  monthlyBudget: number;
  savingsGoal: number;
  onUpdateSettings: (settings: {
    initial_balance: number;
    monthly_budget: number;
    savings_goal: number;
  }) => void;
}

export default function SettingsPanel({
  initialBalance,
  monthlyBudget,
  savingsGoal,
  onUpdateSettings
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(initialBalance.toString());
  const [budget, setBudget] = useState(monthlyBudget.toString());
  const [goal, setGoal] = useState(savingsGoal.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const balanceNum = parseFloat(balance);
    const budgetNum = parseFloat(budget);
    const goalNum = parseFloat(goal);

    if (isNaN(balanceNum) || isNaN(budgetNum) || isNaN(goalNum) ||
        budgetNum <= 0 || goalNum <= 0) {
      alert('Please enter valid positive numbers for all fields');
      return;
    }

    onUpdateSettings({
      initial_balance: balanceNum,
      monthly_budget: budgetNum,
      savings_goal: goalNum
    });

    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-800 font-semibold hover:text-blue-600 transition-colors"
      >
        <Settings className="w-5 h-5" />
        <span>{isOpen ? 'Hide' : 'Show'} Settings</span>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Balance
            </label>
            <input
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Budget
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Savings Goal
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </form>
      )}
    </div>
  );
}
