import { useState } from "react";
import LoginModal from "./components/LoginModal.jsx";
import MapPage from "./components/MapPage";
import './App.css';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapPage />

      <button id="open-login"
        onClick={() => setShowLogin(true)}
        style={{
          position: "absolute",
          top: "10px",
          right: "60px",
          background: "white",
          border: "1px solid black",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 1000
        }}>
        Log In
      </button>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)} />
    </div>
  );
}