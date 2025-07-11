// src/components/SummaryCard.jsx
import { motion } from "framer-motion";

function SummaryCard({ summary }) {
  const { balance, transactionsThisMonth, totalAccounts } = summary;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-blue-50 rounded-lg p-4 space-y-3 shadow-inner"
    >
      <div className="flex justify-between">
        <span className="text-gray-600">Current Balance</span>
        <span className="text-xl font-semibold">${balance.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Transactions This Month</span>
        <span className="font-medium">{transactionsThisMonth}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Linked Accounts</span>
        <span className="font-medium">{totalAccounts}</span>
      </div>
    </motion.div>
  );
}

export default SummaryCard;
