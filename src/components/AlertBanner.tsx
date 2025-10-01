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
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg shadow-md text-red-200">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-400 mr-3" />
            <div>
              <h3 className="text-red-300 font-semibold">Budget Exceeded!</h3>
              <p className="text-red-300/80 text-sm mt-1">
                You have exceeded your monthly budget. Consider reviewing your expenses.
              </p>
            </div>
          </div>
        </div>
      )}

      {goalReached && (
        <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg shadow-md text-green-200">
          <div className="flex items-center">
            <PartyPopper className="w-6 h-6 text-green-400 mr-3" />
            <div>
              <h3 className="text-green-300 font-semibold">Savings Goal Reached!</h3>
              <p className="text-green-300/80 text-sm mt-1">
                Congratulations! You have reached your savings goal. Keep up the great work!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
