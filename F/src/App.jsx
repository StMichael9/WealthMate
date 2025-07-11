import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Authentication/AuthContext.jsx";
import "./index.css";

import LoginForm from "./Authentication/LoginForm.jsx";
import SignupForm from "./Authentication/SignupForm.jsx";
import Profile from "./Authentication/Profile.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import HomeDashBoard from "./Dashboard/HomeDashBoard.jsx";
import MainLayout from "./Components/MainLayout.jsx"; // ⬅️ new layout
import PlaidLink from "./Plaid/PlaidLink.jsx"; // Ensure this is correctly imported
// Pages folder imports
import Transactions from "./Pages/Transactions.jsx";
import Transfer from "./Pages/Transfer.jsx";
import Banks from "./Pages/Banks.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes (no layout) */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/plaid-link" element={<PlaidLink />} /> Removed to prevent duplicate PlaidLink rendering */}

          {/* Protected Routes (with sidebar layout) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<HomeDashBoard />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transfer" element={<Transfer />} />

            {/* Add more internal routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
