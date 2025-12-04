import React, { useState } from "react";
import { searchInstagramAccount } from "../instagramAPI.js";
import { addTrackedAccount, removeTrackedAccount, updateInstagramCache } from "../firebase.js"

export default function AccountSearch({ user, trackedAccounts, onAddAccount, onRemoveAccount }) { 
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    const username = input.trim().replace('@', '');
    if (!username) return;

    setSearchResult(null);
    setError(null);
    setIsLoading(true);
    try {
      // Mock API call
      // TODO: need to figure out a way to actually get accounts
      const result = await searchInstagramAccount(username);

      if (result) {
        setSearchResult(result);
      } else {
        setError(`Account "@${username}" not found or is not a business/creator account.`);
      }
    } catch (err) {
      setError("An error occurred during search. Please try again.");
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleAddAccount = async () => {
    if (!searchResult) return;
    const username = searchResult.username;

    // Always update local accounts
    onAddAccount(username);

    // Write to Firestore if logged in
    if (user) {
      try {
        await updateInstagramCache(username, searchResult);
        const added = await addTrackedAccount(user.uid, username);
        if (added) {
          console.log(`[AccountSearch] Added @${username} to Firestore.`);
        } else {
          console.log(`[AccountSearch] @${username} already tracked.`)
        }
      } catch (err) {
        console.error(err);
        setError("[AccountSearch] Failed to update Firestore (add).");
      }
    }
  }

  const handleRemoveAccount = async () => {
    if (!searchResult) return;
    const username = searchResult.username;

    // Always update local accounts
    onRemoveAccount(username);

    // Remove from Firestore if logged in
    if (user) {
      try {
        const removed = await removeTrackedAccount(user.uid, username);
        if (removed) {
          console.log(`[AccountSearch] Removed @${username} from Firestore.`);
        } else {
          console.log(`[AccountSearch] @${username} not tracked.`)
        }
      } catch (err) {
        console.error(err);
        setError("[AccountSearch] Failed to update Firestore (remove).")
      }
    }
  }

  const isTracked = searchResult && trackedAccounts?.includes(searchResult.username);

  return (
    <div className="account-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search Instagram handle"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="search-status-error">
          {error}
        </div>
      )}
      
      {searchResult && (
        <div className="search-result">
          @{searchResult.username}
          {isTracked ? (
            <button onClick={handleRemoveAccount}>-</button>
          ) : (
            <button onClick={handleAddAccount}>+</button>
          )}
        </div>
      )}
    </div>
  );
}