import React, { useState } from "react";
// Removed import { addTrackedAccount } from "../firebase.js", if this is wrong please adjust
import { searchInstagramAccount } from "../api/instagramAPI.js";

/**
 * Search bar component to lookup Instagram handles and add them to the tracked list.
 * @param {object} props
 * @param {object | null} props.user - The currently logged-in user object or null.
 * @param {function} props.onAddClub - Callback to add the club to the temporary list.
 */
export default function ClubSearch({ user, onAddClub }) { 
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const username = input.trim().toLowerCase().replace('@', '');

    if (!username) return;

    setSearchResult(null);
    setError(null);
    setIsLoading(true);

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

  const handleAddClub = () => {
    // BYPASS AUTH: Call the simple add function directly
    if (searchResult) {
      try {
        onAddClub(searchResult.username); // Call the function passed from MapPage
        
        // Optional: Clear results or show success message
        setInput("");
        setSearchResult(null);
        alert(`Successfully added ${searchResult.username}! (TEST MODE)`);

      } catch (err) {
        setError(`Failed to add club: ${err.message}`);
      }
    }
  };

  return (
    <div className="club-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search Instagram handle (e.g., @club_a)"
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
            Add to List (TEST MODE)
          </button>
        </div>
      )}
    </div>
  );
}