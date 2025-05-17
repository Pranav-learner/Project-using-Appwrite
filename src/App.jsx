import { useState } from "react";
import "./App.css";

function App() {
  console.log(import.meta.env.VITE_API_URL); // using vite
  return (
    // using react we write process.env
    <>
      <p>Hello</p>
    </>
  );
}

export default App;
