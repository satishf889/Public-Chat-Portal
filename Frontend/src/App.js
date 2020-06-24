import React from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Chat />
    </div>
  );
}

export default App;
