import { useAuth } from "../Authentication/AuthContext";

const HeaderBox = () => {
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
        Dashboard
      </h1>
      <p className="text-lg text-gray-700 mb-2 text-center">
        {user ? `Welcome, ${user.username}!` : "Welcome to your dashboard!"}
      </p>
      <p className="text-gray-500 text-center mb-6">
        Here you can manage your finances, view reports, and more.
      </p>
    </>
  );
};

export default HeaderBox;
