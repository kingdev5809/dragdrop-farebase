import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Auth/Login";
import Sign from "./components/Auth/Sign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";

function App() {
  const [user, setUser] = useState("");
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/sign" element={!user ? <Sign /> : ""} />
          <Route path="/login" element={!user ? <Login /> : ""} />
          <Route
            path="/"
            element={user ? <HomePage user={user} /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
