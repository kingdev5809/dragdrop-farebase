import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Auth/Login";
import Sign from "./components/Auth/Sign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";

function App() {
  const [user, setUser] = useState("");
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign" element={<Sign />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={user ? <HomePage user={user} /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
