import { useState } from "react";
import { getRegisteredUsers, getUserEvents } from "../firebase.js"; // You’ll implement these

/**
 * Search for registered users and fetch their events.
 *
 * @param {Function} onSelectUserEvents - Callback with selected user's events
 */
export default function UserSearch({ onSelectUserEvents }) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = input.trim().toLowerCase();
    if (!query) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const users = await getRegisteredUsers(); // Returns array of {uid, email, displayName}
      const filtered = users.filter(
        (u) =>
          (u.email && u.email.toLowerCase().includes(query)) ||
          (u.displayName && u.displayName.toLowerCase().includes(query))
      );

      if (filtered.length === 0) setError("No users found.");
      setResults(filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to search users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = async (uid) => {
    try {
      const events = await getUserEvents(uid); // Fetch this user's uploaded events from Firestore
      onSelectUserEvents(events);
    } catch (err) {
      console.error(err);
      setError("Failed to load user events.");
    }
  };

  return (
    <div className="user-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search users by email or name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="search-status error">{error}</div>}

      {results.length > 0 && (
        <div className="search-results">
          {results.map((user) => (
            <div key={user.uid} className="search-result-item">
              <span>{user.displayName || user.email}</span>
              <button onClick={() => handleSelectUser(user.uid)}>
                View Events
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
