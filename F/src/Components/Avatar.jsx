import { motion } from "framer-motion";

function Avatar({ username, avatarUrl }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center space-x-4"
    >
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt={`${username}’s avatar`}
        className="h-14 w-14 rounded-full object-cover border-2 border-blue-200"
      />
      <h2 className="text-2xl font-bold text-blue-700">Welcome, {username}</h2>
    </motion.div>
  );
}

export default Avatar;
