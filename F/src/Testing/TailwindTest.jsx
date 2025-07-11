import React from "react";

const TailwindTest = () => {
  return (
    <div className="bg-gray-100 text-gray-800 p-6 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tight text-blue-600">
            Tailwind Test Component
          </h1>
          <p className="mt-2 text-gray-500">
            If this card looks nicely styled—with padding, a shadow, and a
            button—Tailwind CSS is working 🎉
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
