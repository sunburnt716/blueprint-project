import { useState, useEffect } from "react";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import LoginModal from "./components/LoginModal.jsx";
import MapPage from "./components/MapPage.jsx";
import ClubSearch from "./components/ClubSearch.jsx";

import './App.css';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapPage user={user}/>

      <ClubSearch user={user}/>

      <button className="open-login-btn" onClick={() => setShowLogin(true)}>
        {user ? "Account" : "Log In"}
      </button>

      <LoginModal
        user={user}
        isOpen={showLogin}
        onClose={() => setShowLogin(false)} />
    </div>
  );
}