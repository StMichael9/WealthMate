export default function MyBanks() {
  const cards = [
    { bank: "Horizon Banking", owner: "Adrian Hajdin" },
    { bank: "Bank of Australia", owner: "Adrian Hajdin" },
    { bank: "Bank of India", owner: "Adrian Hajdin" },
    { bank: "Bank of America", owner: "Olivia Rhye" },
    { bank: "Bank of Canada", owner: "Olivia Rhye" },
    { bank: "Bank of Pakistan", owner: "Olivia Rhye" },
  ];

  return (
    <div className="flex-1 p-8 animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-1">My Bank Accounts</h2>
      <p className="text-gray-500 mb-6">
        Effortlessly Manage Your Banking Activities
      </p>

      <div className="grid grid-cols-3 gap-6">
        {cards.map(({ bank, owner }) => (
          <div
            key={bank}
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-white font-semibold mb-6">{bank}</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-white/80 text-sm">{owner}</span>
              <span className="text-white/80 text-sm">06/24</span>
            </div>
            <div className="text-white text-lg font-mono mb-4">
              1234 1234 1234 1234
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white w-3/4 animate-pulse"></div>
            </div>
            <p className="text-white/80 text-sm mt-2">
              Spending this month: $2,840.40
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
