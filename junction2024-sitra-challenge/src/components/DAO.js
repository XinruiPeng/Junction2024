// src/components/DAO.js
import React, { useState, useEffect } from "react";
import ActivityLog from "./ActivityLog";

// Helper function to generate a timestamp
const getTimestamp = () => new Date().toLocaleString();

// Helper function to generate a "Metamask-like" address
const generateRandomAddress = () => {
  const randomBytes = new Uint8Array(16); // 16 bytes (128 bits)
  crypto.getRandomValues(randomBytes);
  let address = "0x";
  randomBytes.forEach((byte) => {
    address += byte.toString(16).padStart(2, "0");
  });
  return address;
};

// Helper function to generate Proposal ID based on date and time
let proposalCounter = 0; // Counter to differentiate proposals created at the same second
const generateProposalId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString("default", { month: "short" }).toUpperCase();
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Increment the counter every time a new proposal is generated in the same second
  proposalCounter += 1;

  return `${year}${month}${day}${hours}${minutes}${seconds}${String(proposalCounter).padStart(2, "0")}`; // Format: YYYYMMMDDHHMMSSxx
};

const DAO = () => {
  const [proposals, setProposals] = useState([]);
  const [activities, setActivities] = useState([]); // To store activities
  const [newProposal, setNewProposal] = useState("");
  const [voted, setVoted] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedVote, setSelectedVote] = useState(""); // Track selected vote option

  useEffect(() => {
    // On component mount, retrieve the user ID from localStorage
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      setResultMessage("User not logged in. Please log in.");
    }
  }, []);

  const createProposal = () => {
    if (!newProposal) return;

    const proposalId = generateProposalId();  // Generate Proposal ID based on current date and time
    const timestamp = getTimestamp();
    const user = userId || generateRandomAddress();  // Use user ID or generate a new one if not logged in

    // Create a new proposal object
    const newProp = {
      id: proposalId,
      description: newProposal,
      votes: 0,
      timestamp: timestamp,
      userId: user,
    };

    // Update proposals and activities
    setProposals([...proposals, newProp]);
    setActivities([
      ...activities,
      {
        type: "Proposal Created",
        text: newProposal,
        id: proposalId, // Store Proposal ID
        timestamp: timestamp,
        userId: user,  // Store user ID for who made the proposal
      },
    ]);
    setNewProposal(""); // Reset the input
  };

  const voteOnProposal = (id) => {
    if (voted) {
      setResultMessage("You have already voted on a proposal.");
      return;
    }

    if (!selectedVote) {
      setResultMessage("Please select a voting option.");
      return;
    }

    const updatedProposals = proposals.map((prop) =>
      prop.id === id ? { ...prop, votes: prop.votes + 1 } : prop
    );

    // Update proposals and activities
    setProposals(updatedProposals);
    const voteTimestamp = getTimestamp();
    setActivities([
      ...activities,
      {
        type: "Vote Cast",
        proposalId: id,
        timestamp: voteTimestamp,
        userId: userId || generateRandomAddress(),  // Store user ID or generate a new one
        vote: selectedVote,  // Store the selected vote option
      },
    ]);
    setVoted(true);
    setResultMessage("Your vote has been cast!");
  };

  return (
    <div className="dao-container">
      <h1>Welcome to the Forum</h1>
      {userId && <p>Your unique ID: <strong>{userId}</strong></p>}

      <div className="proposal-section">
        <h2>Create a Proposal</h2>
        <input
          type="text"
          value={newProposal}
          onChange={(e) => setNewProposal(e.target.value)}
          placeholder="Enter proposal description"
        />
        <button onClick={createProposal}>Create</button>
      </div>

      <div className="vote-section">
        <h2>Vote on Proposals</h2>
        {proposals.length === 0 ? (
          <p>No proposals yet</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal.id} className="proposal">
              <p>{proposal.description}</p>
              <p>Votes: {proposal.votes}</p>
              <p>Created at: {proposal.timestamp}</p>
              <p>Proposal ID: {proposal.id}</p> {/* Display Proposal ID */}
              <p>Made by: {proposal.userId}</p> {/* Show user ID */}
              
              <div className="vote-options">
                <button 
                  className={`vote-option at-variance ${selectedVote === "At variance" ? "selected" : ""}`}
                  onClick={() => setSelectedVote("At variance")}
                >
                  At variance
                </button>
                <button 
                  className={`vote-option skip-neutral ${selectedVote === "Skip/Neutral" ? "selected" : ""}`}
                  onClick={() => setSelectedVote("Skip/Neutral")}
                >
                  Skip/Neutral
                </button>
                <button 
                  className={`vote-option of-one-mind ${selectedVote === "Of one mind" ? "selected" : ""}`}
                  onClick={() => setSelectedVote("Of one mind")}
                >
                  Of one mind
                </button>
              </div>

              <button onClick={() => voteOnProposal(proposal.id)} className="submit-btn">
                Submit Vote
              </button>
            </div>
          ))
        )}
      </div>

      {resultMessage && <p>{resultMessage}</p>}

      {/* Embed ActivityLog component */}
      <ActivityLog activities={activities} />
    </div>
  );
};

export default DAO;



