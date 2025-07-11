import { useAuth } from "../Authentication/AuthContext";
import { useEffect, useState } from "react";

import Avatar from "../Components/Avatar.jsx";
import SummaryCard from "../Components/SummaryCard.jsx";
import Actions from "../Components/Actions.jsx";
import Skeleton from "../Components/Skeleton.jsx";

export default function Profile() {
  const { user, logout } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/finance/summary/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch summary");
        return res.json();
      })
      .then((data) => setSummary(data))
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
          <p className="text-gray-700">Please log in to see this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <Avatar username={user.username} avatarUrl={user.avatarUrl} />

        {loading && <Skeleton rows={3} />}

        {error && (
          <p role="alert" className="text-red-500 text-center">
            {error}
          </p>
        )}

        {summary && <SummaryCard summary={summary} />}

        <Actions onLogout={logout} />
      </div>
    </div>
  );
}
