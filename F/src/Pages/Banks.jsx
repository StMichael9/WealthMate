import React, { useEffect, useState } from "react";
import BankCard from "./BankCard";
import { motion, AnimatePresence } from "framer-motion";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBanks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/banks", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized or server error");
      const data = await res.json();
      setBanks(data.banks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();

    // Optional: Poll for new banks every 5 seconds
    const interval = setInterval(fetchBanks, 5000);
    return () => clearInterval(interval);
  }, []);

  const deleteBank = async (bankId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/banks/${bankId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete bank");
      setBanks((prev) => prev.filter((bank) => bank.id !== bankId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-blue-600 animate-pulse font-medium">
          Loading banks...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        🏦 My Banks
      </h2>
      {banks.length === 0 ? (
        <div className="text-center text-gray-500">No banks connected yet.</div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {banks.map((bank) => (
              <motion.div
                key={bank.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <BankCard bank={bank} onDelete={deleteBank} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Banks;
