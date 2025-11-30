import { useEffect, useState } from "react";



export function useListings({ hostId = null, city = null } = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadListings() {
      try {
        let url = "http://localhost:5000/api/listings";

        const params = new URLSearchParams();

        if (hostId) params.append("host", hostId);
        if (city) params.append("city", city);

        if ([...params].length > 0) {
          url += `?${params.toString()}`;
        }

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
  }, [hostId, city]);

  return { listings, loading, error };
}
