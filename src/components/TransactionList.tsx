import { Plus, Minus, Trash2 } from 'lucide-react';
import { Transaction } from '../lib/supabase';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md p-6 mb-8 border border-neutral-800 text-gray-100">
      <h2 className="text-xl font-bold text-gray-100 mb-6">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>No transactions yet. Add your first transaction above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-900/40' : 'bg-red-900/40'
                  } border border-neutral-700`}
                >
                  {transaction.type === 'income' ? (
                    <Plus className="w-5 h-5 text-green-400" />
                  ) : (
                    <Minus className="w-5 h-5 text-red-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-100">{transaction.category}</span>
                    {transaction.description && (
                      <span className="text-sm text-gray-400">- {transaction.description}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(transaction.transaction_date)}</span>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold text-lg ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDeleteTransaction(transaction.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors border border-transparent hover:border-red-800"
                title="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
