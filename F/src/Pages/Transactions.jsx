import React, { useState, useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useBanks } from "../hooks/useBanks";
import { motion } from "framer-motion";

const Transactions = () => {
  const { banks, loading: banksLoading } = useBanks();
  const [selectedBankId, setSelectedBankId] = useState(null);
  const {
    transactions,
    loading: transactionsLoading,
    error,
  } = useTransactions(selectedBankId);

  useEffect(() => {
    if (!banksLoading && banks.length > 0 && !selectedBankId) {
      setSelectedBankId(banks[0].id);
    }
  }, [banksLoading, banks, selectedBankId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-10 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        📊 Transaction History
      </h2>

      {banksLoading ? (
        <div className="text-center text-gray-500 animate-pulse">
          Loading accounts...
        </div>
      ) : banks.length === 0 ? (
        <div className="text-center text-gray-500">No banks connected yet.</div>
      ) : (
        <div className="mb-8 flex gap-2 flex-wrap justify-center">
          {banks.map((bank) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={bank.id}
              className={`px-5 py-3 rounded-full font-semibold transition-colors duration-200 shadow-sm text-sm md:text-base ${
                selectedBankId === bank.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
              onClick={() => setSelectedBankId(bank.id)}
            >
              {bank.name || "Bank"}
            </motion.button>
          ))}
        </div>
      )}

      {transactionsLoading ? (
        <div className="text-center text-gray-500 animate-pulse">
          Loading transactions...
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : transactions && transactions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="overflow-x-auto bg-white rounded-xl shadow-lg"
        >
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-blue-50 border-b border-blue-200">
              <tr>
                <th className="py-3 px-4 text-left text-blue-700">Date</th>
                <th className="py-3 px-4 text-left text-blue-700">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-blue-700">Category</th>
                <th className="py-3 px-4 text-right text-blue-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, idx) => (
                <tr
                  key={txn.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                  } hover:bg-blue-100 transition-colors border-b border-gray-100 last:border-0`}
                >
                  <td className="py-3 px-4">{txn.date}</td>
                  <td className="py-3 px-4">{txn.name || txn.description}</td>
                  <td className="py-3 px-4">
                    {txn.category?.join(", ") || "—"}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-semibold font-mono ${
                      txn.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {txn.amount < 0 ? "-" : "+"}$
                    {Math.abs(txn.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="text-center text-gray-500">
          No transactions found for this account.
        </div>
      )}
    </motion.div>
  );
};

export default Transactions;
