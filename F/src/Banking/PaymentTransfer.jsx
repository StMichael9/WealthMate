import { useState } from "react";

export default function PaymentTransfer() {
  const [account, setAccount] = useState("");
  const [note, setNote] = useState(
    "Dear John,\n\nI hope this message finds you well..."
  );
  const [recipientEmail, setRecipientEmail] = useState("john@gmail.com");
  const [recipientAcct, setRecipientAcct] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex-1 p-8 animate-fadeIn max-w-3xl">
      <h2 className="text-2xl font-semibold mb-2">Payment Transfer</h2>
      <p className="text-gray-500 mb-6">
        Please provide any specific details or notes related to the payment
        transfer
      </p>

      {/* Transfer Details */}
      <div className="space-y-4 mb-8">
        <label className="block text-gray-700 font-medium">
          Select Source Bank
        </label>
        <select
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">Select Account</option>
          <option value="chase">Chase Bank – ****1234</option>
          <option value="boa">Bank of America – ****5678</option>
        </select>

        <label className="block text-gray-700 font-medium">
          Transfer Note (Optional)
        </label>
        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Recipient Details */}
      <div className="space-y-4 mb-8">
        <label className="block text-gray-700 font-medium">
          Recipient’s Email Address
        </label>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <label className="block text-gray-700 font-medium">
          Recipient’s Bank Account Number
        </label>
        <input
          type="text"
          placeholder="Enter the account number"
          value={recipientAcct}
          onChange={(e) => setRecipientAcct(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <label className="block text-gray-700 font-medium">Amount</label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <button
        onClick={() => {
          /* submit logic */
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 transform active:scale-95"
      >
        Transfer Funds
      </button>
    </div>
  );
}
