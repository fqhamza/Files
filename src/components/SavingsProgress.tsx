import { Target } from 'lucide-react';

interface SavingsProgressProps {
  currentBalance: number;
  savingsGoal: number;
}

export default function SavingsProgress({ currentBalance, savingsGoal }: SavingsProgressProps) {
  const progress = Math.min((currentBalance / savingsGoal) * 100, 100);

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md p-6 mb-8 border border-neutral-800 text-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="w-6 h-6 text-purple-400 mr-3" />
          <h2 className="text-xl font-bold text-gray-100">Savings Goal Progress</h2>
        </div>
        <span className="text-sm font-semibold text-purple-300">
          {progress.toFixed(1)}%
        </span>
      </div>

      <div className="w-full bg-neutral-800 rounded-full h-4 mb-4">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <span>Current: ${currentBalance.toFixed(2)}</span>
        <span>Goal: ${savingsGoal.toFixed(2)}</span>
      </div>
    </div>
  );
}
