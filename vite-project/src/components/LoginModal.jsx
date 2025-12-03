import { useEffect, useState } from "react";
import { auth, loginWithGoogle, logout, addUser } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import "../App.css";

// import { listenUserTrackedAccounts, listenInstagramCache } from "../firebase.js";

export default function LoginModal({ isOpen, onClose }) {
    // console.log("Modal open?", isOpen);
    const [user, setUser] = useState(null);

    // Listen for login/logout changes
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
        });
        return () => unsub();
    }, [setUser]);

    // Modal not open / user hasn't clicked login button
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <button id="exit-login" onClick={onClose}>
                x
            </button>

            <h3 id="login-modal-title">
                {user ? "Account" : "Log In"}
            </h3>

            {user ? (
                <div id="logged-in-section">
                    <div id="profile-display">
                        <img src={user.photoURL} alt="profile" />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                    </div>

                    <button id="logout-button" onClick={logout}>
                        Log Out
                    </button>
                </div>
            ) : (
                <button id="login-button"
                    onClick={async () => {
                        const user = await loginWithGoogle();
                        await addUser(user);
                        onClose();
                    }}>
                    Sign in with Google
                </button>
            )}
        </div>
    );
}