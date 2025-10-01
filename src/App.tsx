import { useEffect, useState } from 'react';
import { supabase, Transaction, UserSettings } from './lib/supabase';
import StatsCards from './components/StatsCards';
import AlertBanner from './components/AlertBanner';
import SavingsProgress from './components/SavingsProgress';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlySummary from './components/MonthlySummary';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: settingsData } = await supabase
        .from('user_settings')
        .select('*')
        .maybeSingle();

      if (settingsData) {
        setSettings(settingsData);
      }

      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (transactionsData) {
        setTransactions(transactionsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transactionData: {
    type: 'income' | 'expense';
    category: string;
    amount: number;
    description: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTransactions([data, ...transactions]);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };

  const handleUpdateSettings = async (newSettings: {
    initial_balance: number;
    monthly_budget: number;
    savings_goal: number;
  }) => {
    if (!settings) return;

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .update({
          ...newSettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Unable to load settings</div>
      </div>
    );
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);

  const currentBalance = parseFloat(settings.initial_balance.toString()) + totalIncome - totalExpenses;
  const budgetRemaining = parseFloat(settings.monthly_budget.toString()) - totalExpenses;
  const budgetUsage = (totalExpenses / parseFloat(settings.monthly_budget.toString())) * 100;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const budgetExceeded = totalExpenses > parseFloat(settings.monthly_budget.toString());
  const goalReached = currentBalance >= parseFloat(settings.savings_goal.toString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Money Management</h1>
          <p className="text-blue-100">Track your finances and reach your goals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AlertBanner budgetExceeded={budgetExceeded} goalReached={goalReached} />

        <StatsCards
          currentBalance={currentBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          budgetRemaining={budgetRemaining}
        />

        <SavingsProgress
          currentBalance={currentBalance}
          savingsGoal={parseFloat(settings.savings_goal.toString())}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TransactionForm onAddTransaction={handleAddTransaction} />
          <SettingsPanel
            initialBalance={parseFloat(settings.initial_balance.toString())}
            monthlyBudget={parseFloat(settings.monthly_budget.toString())}
            savingsGoal={parseFloat(settings.savings_goal.toString())}
            onUpdateSettings={handleUpdateSettings}
          />
        </div>

        <MonthlySummary
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          budgetUsage={budgetUsage}
          savingsRate={savingsRate}
        />

        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}

export default App;
