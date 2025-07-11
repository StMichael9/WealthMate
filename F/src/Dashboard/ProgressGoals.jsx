import React from "react";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const ProgressGoals = () => {
  // Example static goals; replace with real data as needed
  const goals = [
    { name: "Emergency Fund", progress: 0.7 },
    { name: "Vacation", progress: 0.4 },
    { name: "New Car", progress: 0.2 },
  ];
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
        <TrophyIcon className="w-6 h-6 text-yellow-400" /> Your Goals
      </h3>
      <ul className="space-y-4">
        {goals.map((g, i) => (
          <motion.li
            key={g.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">{g.name}</span>
              <span className="text-sm text-gray-500">
                {Math.round(g.progress * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${g.progress * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              ></motion.div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressGoals;
