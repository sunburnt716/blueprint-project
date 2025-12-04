import React, { useState } from "react";
import { searchInstagramAccount } from "../api/instagramAPI.js";
import { addTrackedAccount, updateInstagramCache } from "../firebase.js"

/**
 * Search bar component to lookup Instagram handles and add them to the tracked list.
 * 
 * Database structure:
 *   /instagramAccounts/{username} - Stores cached Instagram account data.
 *   /users/{uid}/trackedAccounts/{username} - Stores the list of tracked accounts for each user.
 * 
 * @param {object} props
 * @param {object | null} props.user - The currently logged-in user object or null.
 * @param {function} props.onAddClub - Callback to add the club.
 */
export default function ClubSearch({ user, onAddClub }) { 
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const username = input.trim().replace('@', '');
    if (!username) return;

    setSearchResult(null);
    setIsLoading(true);
    setError(null);

    try {
      // 1. Search the account (using simulated API call)
      const result = await searchInstagramAccount(username);

      if (result) {
        setSearchResult(result);
      } else {
        // This will trigger for 'starbucks' or other accounts not in the mock data
        setError(`Account "@${username}" not found or is not a business/creator account.`);
      }
    } catch (err) {
      setError("An error occurred during search. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClub = async () => {
    if (!searchResult) return;

    // User not logged in -> guest mode tracking
    if (!user) {
      if (onAddClub) onAddClub(searchResult.username);

      setInput("");
      setSearchResult(null);
      alert(`@${searchResult.username} added locally. Log in to save it permanently.`);
      return;
    }

    // User is logged in -> write to Firestore
    try {
      await updateInstagramCache(searchResult.username, searchResult);
      await addTrackedAccount(user.uid, searchResult.username);
    
      if (onAddClub) onAddClub(searchResult.username);

      setInput("");
      setSearchResult(null);
      alert(`@${searchResult.username} added to your tracked accounts.`);
    } catch (err) {
      console.error(err);
      setError("Failed to add account. Try again later.");
    }
  };

  return (
    <div className="club-search-container">
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

      {error && <div className="search-status error">{error}</div>}
      
      {searchResult && (
        <div className="search-result">
          <span>@{searchResult.username} ({searchResult.name})</span>
          <button onClick={handleAddClub}>
            Add to Tracked Accounts
          </button>
        </div>
      )}
    </div>
  );
}