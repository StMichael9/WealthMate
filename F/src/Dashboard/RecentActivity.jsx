import React from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const RecentActivity = () => {
  // Example static activity; replace with real data as needed
  const activity = [
    {
      id: 1,
      desc: "Paid Electricity Bill",
      amount: -120.5,
      date: "2025-07-05",
    },
    { id: 2, desc: "Grocery Shopping", amount: -75.2, date: "2025-07-04" },
    { id: 3, desc: "Salary Credited", amount: 2500, date: "2025-07-01" },
  ];
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
        Recent Activity
      </h3>
      <ul className="divide-y divide-gray-200">
        {activity.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="py-2 flex items-center justify-between"
          >
            <span className="flex items-center gap-2 text-gray-700">
              {a.amount < 0 ? (
                <ArrowTrendingDownIcon className="w-5 h-5 text-red-400" />
              ) : (
                <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
              )}
              {a.desc}
            </span>
            <span
              className={`font-mono ${
                a.amount < 0 ? "text-red-500" : "text-green-600"
              }`}
            >
              {a.amount < 0 ? "-" : "+"}$
              {Math.abs(a.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="text-xs text-gray-400 ml-2">{a.date}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
