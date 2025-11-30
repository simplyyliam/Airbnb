import { useEffect, useState } from "react";
import api from "../api/axios";

export function useListings({ hostId = null, city = null } = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadListings() {
      try {
        const params = {};
        if (hostId) params.host = hostId;
        if (city) params.city = city;

        const res = await api.get("/listings", { params });
        setListings(res.data);
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
