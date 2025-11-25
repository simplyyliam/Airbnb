import { useEffect, useState } from "react";

export function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadListings() {
      try {
        const res = await fetch("http://localhost:5000/api/listings");
        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();
        setListings(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  return { listings, loading, error };
}
