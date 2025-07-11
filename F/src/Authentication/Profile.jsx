// src/Authentication/Profile.jsx
import { useAuth } from "../Authentication/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <p className="text-gray-700">Please log in to see this page.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          Welcome, {user.username}!
        </h2>
        <button
          onClick={logout}
          className="mt-4 py-2 px-6 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
