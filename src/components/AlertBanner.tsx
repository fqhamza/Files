import { AlertCircle, PartyPopper } from 'lucide-react';

interface AlertBannerProps {
  budgetExceeded: boolean;
  goalReached: boolean;
}

export default function AlertBanner({ budgetExceeded, goalReached }: AlertBannerProps) {
  if (!budgetExceeded && !goalReached) return null;

  return (
    <div className="mb-6 space-y-4">
      {budgetExceeded && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-red-800 font-semibold">Budget Exceeded!</h3>
              <p className="text-red-700 text-sm mt-1">
                You have exceeded your monthly budget. Consider reviewing your expenses.
              </p>
            </div>
          </div>
        </div>
      )}

      {goalReached && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <PartyPopper className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <h3 className="text-green-800 font-semibold">Savings Goal Reached!</h3>
              <p className="text-green-700 text-sm mt-1">
                Congratulations! You have reached your savings goal. Keep up the great work!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
