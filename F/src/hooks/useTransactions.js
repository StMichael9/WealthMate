import { useEffect, useState } from "react";

export function useTransactions(bankId) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bankId) return;
    fetch(`http://localhost:3000/api/transactions?bankId=${bankId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or server error");
        return res.json();
      })
      .then((data) => {
        setTransactions(data.transactions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [bankId]);

  return { transactions, loading, error };
}
