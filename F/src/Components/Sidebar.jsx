import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../Authentication/AuthContext";
import PlaidLink from "../Plaid/PlaidLink.jsx";
function Sidebar() {
  const { user } = useAuth();
  const links = [
    { to: "/dashboard", label: "Home", Icon: HomeIcon },
    { to: "/banks", label: "My Banks", Icon: CreditCardIcon },
    { to: "/transactions", label: "Transaction History", Icon: BanknotesIcon },
    { to: "/transfer", label: "Payment Transfer", Icon: CurrencyDollarIcon },
  ];

  return (
    <aside className="bg-gradient-to-b from-blue-50 to-blue-100 w-64 border-r h-screen flex flex-col p-6 animate-fadeIn shadow-lg">
      <div className="mb-10 text-2xl font-bold flex items-center gap-2">
        {/*<img src="/" alt="WealthMate" className="h-8 w-8 mr-2" />{" "} */}
        {/* Placeholder for logo */}
        WealthMate
      </div>
      <nav className="flex-1 space-y-2">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-colors duration-200 gap-2 font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`
            }
          >
            <Icon className="h-5 w-5 mr-2" />
            {label}
          </NavLink>
        ))}
        {/* PlaidLink button at the bottom of nav */}
        <div className="mt-8 flex justify-center">
          <div className="w-full">
            <PlaidLink />
          </div>
        </div>
      </nav>
      <div className="mt-auto flex items-center gap-3 bg-white rounded-lg shadow p-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 text-blue-700 font-bold text-lg">
          {user?.username ? user.username[0].toUpperCase() : "U"}
        </div>
        <div className="text-sm">
          <div className="font-semibold text-blue-700">
            {user?.username || "Guest"}
          </div>
          <div className="text-gray-500 truncate max-w-[120px]">
            {user?.email || "Not signed in"}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
