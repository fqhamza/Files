import { BarChart3 } from 'lucide-react';

interface MonthlySummaryProps {
  totalIncome: number;
  totalExpenses: number;
  budgetUsage: number;
  savingsRate: number;
}

export default function MonthlySummary({
  totalIncome,
  totalExpenses,
  budgetUsage,
  savingsRate
}: MonthlySummaryProps) {
  const netChange = totalIncome - totalExpenses;

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md p-6 mb-8 border border-neutral-800 text-gray-100">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
        <h2 className="text-xl font-bold text-gray-100">Monthly Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-neutral-800 rounded-lg border border-neutral-700">
          <p className="text-sm text-gray-400 mb-2">Net Change</p>
          <p className={`text-2xl font-bold ${netChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {netChange >= 0 ? '+' : ''}${netChange.toFixed(2)}
          </p>
        </div>

        <div className="text-center p-4 bg-neutral-800 rounded-lg border border-neutral-700">
          <p className="text-sm text-gray-400 mb-2">Budget Usage</p>
          <p className={`text-2xl font-bold ${budgetUsage > 100 ? 'text-red-400' : 'text-blue-400'}`}>
            {budgetUsage.toFixed(1)}%
          </p>
        </div>

        <div className="text-center p-4 bg-neutral-800 rounded-lg border border-neutral-700">
          <p className="text-sm text-gray-400 mb-2">Savings Rate</p>
          <p className={`text-2xl font-bold ${savingsRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {savingsRate.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
