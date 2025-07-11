import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/create_link_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLinkToken(data.link_token));
  }, []);

  const onSuccess = (public_token, metadata) => {
    // Send public_token to backend to exchange for access_token
    fetch("http://localhost:3000/api/exchange_public_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Ensure cookies/session are sent
      body: JSON.stringify({ public_token }),
    });
    // You can add more logic here (e.g., show success message)
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className={`flex items-center p-2 rounded-lg transition-colors duration-200 gap-2 font-medium w-full
        bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      Connect Bank
    </button>
  );
};

export default PlaidLink;
