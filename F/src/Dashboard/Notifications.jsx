import React from "react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const Notifications = () => {
  // Example static notifications; replace with real data as needed
  const notifications = [
    {
      id: 1,
      message: "Your credit card bill is due in 3 days!",
      type: "alert",
    },
    { id: 2, message: "You received $500 from Payroll.", type: "info" },
  ];
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">
        Notifications
      </h3>
      <ul className="space-y-2">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-2 p-3 rounded shadow text-sm ${
                n.type === "alert"
                  ? "bg-red-50 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {n.type === "alert" ? (
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
              ) : (
                <CheckCircleIcon className="w-5 h-5 text-blue-400" />
              )}
              {n.message}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default Notifications;
