// This file is still being worked on. I plan on adding functionality to actually transfer money between accounts.
// For now, it's just a UI mockup.

import React, { useState, useEffect } from "react";
import { useBanks } from "../hooks/useBanks";
import { motion } from "framer-motion";

const TransferPage = () => {
  const { banks, loading: banksLoading } = useBanks();
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (!banksLoading && banks.length > 0 && !selectedBankId) {
      setSelectedBankId(banks[0].id);
    }
  }, [banksLoading, banks, selectedBankId]);

  const handleTransfer = () => {
    if (!recipient || !amount || isNaN(amount)) {
      alert("Please enter a valid recipient and amount.");
      return;
    }

    setConfirmation({
      to: recipient,
      amount: parseFloat(amount),
      note,
      date: new Date().toLocaleString(),
    });

    setRecipient("");
    setAmount("");
    setNote("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        💸 Transfer Funds
      </h2>

      {banksLoading ? (
        <p className="text-center text-gray-500">Loading accounts...</p>
      ) : banks.length === 0 ? (
        <p className="text-center text-gray-500">No banks connected yet.</p>
      ) : (
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            From Account
          </label>
          <select
            value={selectedBankId || ""}
            onChange={(e) => setSelectedBankId(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name || "Bank"}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Recipient
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient name or account"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Amount ($)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Note (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          placeholder="Add a note for the recipient"
        ></textarea>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleTransfer}
        className="w-full bg-blue-600 text-white font-semibold text-lg py-3 rounded-xl transition-all shadow hover:bg-blue-700"
      >
        Send Transfer
      </motion.button>

      {confirmation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 p-5 rounded-xl bg-green-50 border border-green-300 text-green-800"
        >
          <p className="font-semibold mb-1">✅ Transfer Successful!</p>
          <p>
            <strong>To:</strong> {confirmation.to}
          </p>
          <p>
            <strong>Amount:</strong> ${confirmation.amount.toFixed(2)}
          </p>
          {confirmation.note && (
            <p>
              <strong>Note:</strong> {confirmation.note}
            </p>
          )}
          <p>
            <strong>Date:</strong> {confirmation.date}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransferPage;
