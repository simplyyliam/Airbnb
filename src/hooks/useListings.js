import { useEffect, useState } from "react";



export function useListings(hostId = null) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadListings() {
      try {
        let url = "http://localhost:5000/api/listings";
        if (hostId) url += `?host=${hostId}`;

        const res = await fetch(url);
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
  }, [hostId]);

  return { listings, loading, error };
}
