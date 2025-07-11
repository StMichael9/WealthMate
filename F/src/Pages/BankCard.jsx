import React, { useState } from "react";

export default function BankCard({ bank, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="group bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-200 relative">
      {/* Delete button, only visible on hover */}
      <button
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => setShowConfirm(true)}
        aria-label="Delete bank"
        tabIndex={-1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Confirm Deletion Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center border border-gray-200 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full focus:outline-none"
              onClick={() => setShowConfirm(false)}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-xl font-bold mb-3 text-red-600">
              Delete Bank Account?
            </h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to remove{" "}
              <span className="font-bold">{bank.name || "Bank"}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium shadow-sm border border-gray-200"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold shadow-sm border border-red-600"
                onClick={() => {
                  onDelete(bank.id);
                  setShowConfirm(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10l9-7 9 7v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 21V9h6v12"
            />
          </svg>
          {bank.name || "Bank"}
        </div>
        <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
          {bank.type
            ? bank.type.charAt(0).toUpperCase() + bank.type.slice(1)
            : "Account"}
        </span>
      </div>
      <div className="mb-2 text-gray-700">
        <span className="font-medium">Subtype:</span> {bank.subtype || "N/A"}
      </div>
      <div className="mb-2 text-gray-700">
        <span className="font-medium">Account Number:</span>{" "}
        {bank.mask ? `•••• ${bank.mask}` : "N/A"}
      </div>
      <div className="mb-2 text-gray-700">
        <span className="font-medium">Balance:</span>{" "}
        {typeof bank.balance === "number"
          ? `$${bank.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`
          : "N/A"}
      </div>
    </div>
  );
}
