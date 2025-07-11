import React from "react";
import {
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const AccountSummary = () => {
  // Example static data; replace with real data as needed
  const accounts = [
    {
      name: "Checking",
      balance: 2450.23,
      icon: BanknotesIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Savings",
      balance: 10234.56,
      icon: CurrencyDollarIcon,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Credit Card",
      balance: -320.12,
      icon: CreditCardIcon,
      color: "bg-red-100 text-red-600",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {accounts.map((acc, i) => (
        <motion.div
          key={acc.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`rounded-xl p-5 shadow-lg text-center relative overflow-hidden ${acc.color} bg-opacity-60 backdrop-blur`}
        >
          <div className="flex justify-center mb-2">
            <acc.icon className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-semibold mb-1">{acc.name}</h2>
          <p
            className={`text-2xl font-bold ${
              acc.balance < 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            $
            {acc.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default AccountSummary;
