// src/components/Skeleton.jsx
function Skeleton({ rows = 1 }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full" />
      ))}
    </div>
  );
}

export default Skeleton;
