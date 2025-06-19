// frontend/src/App.js
import React, { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .getTestData()
      .then((response) => setMessage(response.data.message))
      .catch((error) => setMessage("API Error: " + error.message));
  }, []);

  return (
    <div>
      <h1>Connection Status:</h1>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

export default App;