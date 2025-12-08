import React, { useState, useEffect } from "react";

function RandomFetcher() {
  const [number, setNumber] = useState(null); // fetched number
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumber = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const text = await res.text();
      setNumber(text.trim());
    } catch (err) {
      setError(err.message || "Unknown error");
      setNumber(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumber();
  }, []);

  return (
    <div>
      <h3>Random.org number fetcher</h3>

      <div>
        <button onClick={() => fetchNumber()} disabled={loading}>
          {loading ? "Fetching..." : "Fetch again"}
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Loading:</strong> {loading ? "true" : "false"}
      </div>

      <div>
        <strong>Number:</strong> {number === null ? "—" : number}
      </div>

      <div>
        <strong>Error:</strong> {error === null ? "—" : error}
      </div>
    </div>
  );
}

export default RandomFetcher;
