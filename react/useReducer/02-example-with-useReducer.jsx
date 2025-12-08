import { useReducer, useEffect } from "react";

const initialState = {
  loading: false,
  number: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, number: action.payload, error: null };
    case "FETCH_FAILURE":
      return { ...state, loading: false, number: null, error: action.payload };
    default:
      return state;
  }
}

function RandomFetcher() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, number, error } = state;

  const fetchNumber = async () => {
    dispatch({ type: "FETCH_INIT" });

    try {
      const res = await fetch(
        "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const text = await res.text();
      dispatch({ type: "FETCH_SUCCESS", payload: text.trim() });
    } catch (err) {
      dispatch({ type: "FETCH_FAILURE", payload: err.message || "Unknown error" });
    }
  };

  useEffect(() => {
    fetchNumber();
  }, []);

  return (
    <div>
      <h3>Random.org number fetcher (useReducer)</h3>

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
