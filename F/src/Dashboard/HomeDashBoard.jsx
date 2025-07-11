import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../Authentication/AuthContext";
import PlaidLink from "../Plaid/PlaidLink.jsx";
import { useBanks } from "../hooks/useBanks";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "../Components/CustomTooltip.jsx";

export default function HomeDashboard() {
  const { user } = useAuth();
  const { banks, loading: banksLoading } = useBanks();
  const [activeBankId, setActiveBankId] = useState(null);

  const COLORS = [
    "#4F46E5",
    "#9333EA",
    "#EC4899",
    "#F43F5E",
    "#FB7185",
    "#14B8A6",
    "#0EA5E9",
  ];

  const pieData = useMemo(
    () =>
      banks.map((bank) => ({
        name: bank.name ?? "Bank",
        value: typeof bank.balance === "number" ? bank.balance : 0,
      })),
    [banks]
  );

  useEffect(() => {
    if (!banksLoading && banks.length > 0 && !activeBankId) {
      setActiveBankId(banks[0].id);
    }
  }, [banksLoading, banks, activeBankId]);

  const totalBalance = useMemo(() => {
    const total = banks.reduce(
      (sum, b) => sum + (typeof b.balance === "number" ? b.balance : 0),
      0
    );
    return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }, [banks]);

  return (
    <div className="flex-1 p-8 space-y-8 animate-fadeIn">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">
            {user?.username ? `Welcome, ${user.username}` : "Welcome!"}
          </h1>
          <p className="text-gray-500">
            {user?.email
              ? `Access & manage your accounts and transactions efficiently, ${user.email}.`
              : "Access & manage your accounts and transactions efficiently."}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-pink-300 rounded-xl p-6 w-72 transform hover:scale-105 transition-transform duration-300 shadow-lg">
          <div className="text-white font-bold mb-4">
            {user?.username || "User"}
          </div>
          <div className="text-sm text-white/80 mb-6">
            {user?.email || "No email"}
          </div>
          <div className="bg-white rounded-lg p-4 text-center text-xs uppercase">
            <PlaidLink />
          </div>
        </div>
      </header>

      <section className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-200">
        <div>
          <h2 className="text-gray-500">
            {banksLoading
              ? "Loading accounts..."
              : `${banks.length} Bank Account${banks.length !== 1 ? "s" : ""}`}
          </h2>
          <div className="text-2xl font-bold mt-1">
            {banksLoading ? "--" : `$${totalBalance}`}
          </div>
        </div>
        <div className="w-32 h-32 relative overflow-visible select-none">
          {banksLoading || pieData.length === 0 ? (
            <div className="w-full h-full rounded-full border-8 border-blue-300 animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={50}
                  paddingAngle={4}
                  isAnimationActive={false}
                >
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ zIndex: 50 }}
                  position={{ x: -80, y: 0 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Recent transactions</h3>
          <button className="text-blue-500 hover:underline">View all</button>
        </div>
        <div className="flex border-b overflow-x-auto">
          {banks.map((bank) => (
            <button
              key={bank.id}
              className={`px-4 py-2 -mb-px font-medium whitespace-nowrap transition-colors duration-200 ${
                activeBankId === bank.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveBankId(bank.id)}
            >
              {bank.name || "Bank"}
            </button>
          ))}
        </div>
        <ul className="space-y-4">
          <li className="text-gray-400 text-sm">
            {/*Connect a Plaid account and implement /api/transactions to show
            real transactions here.) */}
          </li>
        </ul>
      </section>
    </div>
  );
}
