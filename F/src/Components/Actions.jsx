function Actions({ onLogout }) {
  const btnClasses =
    "flex-1 py-2 text-white rounded-md transition transform hover:scale-105";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => window.location.assign("/transactions")}
        className={`${btnClasses} bg-green-500 hover:bg-green-600`}
      >
        View Transactions
      </button>
      <button
        onClick={() => window.location.assign("/profile/settings")}
        className={`${btnClasses} bg-yellow-500 hover:bg-yellow-600`}
      >
        Update Profile
      </button>
      <button
        onClick={onLogout}
        className={`${btnClasses} bg-red-500 hover:bg-red-600`}
      >
        Log Out
      </button>
    </div>
  );
}

export default Actions;
