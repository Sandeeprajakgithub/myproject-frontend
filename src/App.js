// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL; // Get backend URL from environment variable

function App() {
  const [name, setName] = useState(""); // Stores input value
  const [names, setNames] = useState([]); // Stores list of names

  // Function to handle form submission
  const addName = async () => {
    if (!name.trim()) return alert("Please enter a name!"); // Prevent empty names

    try {
      await axios.post(`${backendURL}/add-name`, { name });
      setName(""); // Clear input field after saving
      fetchNames(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding name:", error);
      alert("Failed to save name");
    }
  };

  // Function to fetch all names from the backend
  const fetchNames = async () => {
    try {
      const response = await axios.get(`${backendURL}/get-names`);
      setNames(response.data.names);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };

  // Fetch names when the component loads
  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Name Saver</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a name"
      />
      <button onClick={addName}>Save Name</button>

      <h2>Saved Names:</h2>
      <ul>
        {names.map((n, index) => (
          <li key={index}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
