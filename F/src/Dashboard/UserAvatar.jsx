import React from "react";
import { useAuth } from "../Authentication/AuthContext";

const UserAvatar = () => {
  const { user } = useAuth();
  if (!user) return null;
  const initials = user.username ? user.username[0].toUpperCase() : "U";
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-xl shadow mr-4">
      {initials}
    </div>
  );
};

export default UserAvatar;
