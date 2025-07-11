import React from "react";
import { motion } from "framer-motion";
import {
  PlusCircleIcon,
  ArrowsRightLeftIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

const actions = [
  {
    label: "Add Transaction",
    color: "bg-blue-600 hover:bg-blue-700",
    icon: PlusCircleIcon,
    shadow: "shadow-blue-200",
  },
  {
    label: "Transfer Funds",
    color: "bg-green-600 hover:bg-green-700",
    icon: ArrowsRightLeftIcon,
    shadow: "shadow-green-200",
  },
  {
    label: "Download Report",
    color: "bg-gray-600 hover:bg-gray-700",
    icon: ArrowDownTrayIcon,
    shadow: "shadow-gray-200",
  },
];

const QuickActions = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {actions.map(({ label, color, icon: Icon, shadow }) => (
        <motion.button
          whileHover={{
            scale: 1.08,
            y: -4,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
          }}
          whileTap={{ scale: 0.97 }}
          key={label}
          className={`flex flex-col items-center justify-center ${color} text-white px-6 py-4 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 shadow-lg ${shadow} relative overflow-hidden`}
          style={{ minWidth: 150 }}
        >
          <Icon className="w-8 h-8 mb-2" />
          <span className="text-base tracking-wide">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
