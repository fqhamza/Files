import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface StatsCardsProps {
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
  budgetRemaining: number;
}

export default function StatsCards({
  currentBalance,
  totalIncome,
  totalExpenses,
  budgetRemaining
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-neutral-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Current Balance</p>
            <p className="text-2xl font-bold text-gray-100 mt-2">
              ${currentBalance.toFixed(2)}
            </p>
          </div>
          <div className="bg-neutral-800 p-3 rounded-full">
            <Wallet className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Income</p>
            <p className="text-2xl font-bold text-green-400 mt-2">
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="bg-neutral-800 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Expenses</p>
            <p className="text-2xl font-bold text-red-400 mt-2">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
          <div className="bg-neutral-800 p-3 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Budget Remaining</p>
            <p className={`text-2xl font-bold mt-2 ${budgetRemaining >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
              ${budgetRemaining.toFixed(2)}
            </p>
          </div>
          <div className={`p-3 rounded-full bg-neutral-800`}>
            <DollarSign className={`w-6 h-6 ${budgetRemaining >= 0 ? 'text-blue-400' : 'text-red-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
