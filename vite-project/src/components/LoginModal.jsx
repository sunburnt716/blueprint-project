import { useEffect, useState } from "react";
import { auth, loginWithGoogle, logout, ensureUserDocument } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import "../App.css";

export default function LoginModal({ user, isOpen, onClose }) {
    // Modal not open / user hasn't clicked login button
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <button className="exit-login-btn" onClick={onClose}>
                x
            </button>

            <div className="user-info">
                {user ? (
                    <div className="logged-in-section">
                        <div className="profile-display">
                            <img src={user.photoURL} alt="profile" />
                            <p>{user.displayName}</p>
                            <p>{user.email}</p>
                        </div>

                        <button className="logout-button" onClick={logout}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <button className="login-button"
                        onClick={async () => {
                            const user = await loginWithGoogle();
                            await ensureUserDocument(user);
                            onClose();
                        }}>
                        Sign in with Google
                    </button>
                )}
            </div>
        </div>
    );
}