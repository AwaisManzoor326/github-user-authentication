import React, { useState } from "react";

const GitHubUserApp = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    if (!username) return;
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>GitHub User Lookup</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
        <button
          onClick={fetchUserData}
          style={{ padding: "8px 16px", marginLeft: "10px" }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "300px",
            margin: "0 auto",
          }}
        >
          <img
            src={userData.avatar_url}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h2>{userData.name || "No Name Provided"}</h2>
          <p>@{userData.login}</p>
          <p>{userData.bio || "No bio available"}</p>
          <p>
            Followers: {userData.followers} | Following: {userData.following}
          </p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            Visit Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default GitHubUserApp;