import React from "react";
import HeaderBox from "./HeaderBox";
import UserAvatar from "./UserAvatar";
import AccountSummary from "./AccountSummary";
import QuickActions from "./QuickActions";
import Notifications from "./Notifications";
import ProgressGoals from "./ProgressGoals";
import RecentActivity from "./RecentActivity";
import { useAuth } from "../Authentication/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-4">
          <UserAvatar />
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-1 text-center md:text-left">
              {user?.username ? `Welcome, ${user.username}!` : "Welcome!"}
            </h1>
            <p className="text-gray-500 text-center md:text-left">
              {user?.email ? user.email : "Access your personalized dashboard."}
            </p>
          </div>
        </div>
        <AccountSummary />
        <QuickActions />
        <Notifications />
        <ProgressGoals />
        <RecentActivity />
        <footer className="mt-10 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} FinTrust. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
