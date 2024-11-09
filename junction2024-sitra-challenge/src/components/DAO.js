import React, { useState, useEffect } from "react";
import ActivityLog from "./ActivityLog";
import PieChart from "./PieChart"; // Import PieChart component

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
  const [votedProposals, setVotedProposals] = useState([]); // Track voted proposal IDs
  const [resultMessage, setResultMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedVotes, setSelectedVotes] = useState({}); // Track selected vote option per proposal

  useEffect(() => {
    // On component mount, retrieve the user ID and proposals from localStorage
    const id = localStorage.getItem("userId");
    const savedProposals = JSON.parse(localStorage.getItem("proposals")) || [];
    const voted = JSON.parse(localStorage.getItem("votedProposals")) || [];

    if (id) {
      setUserId(id);
    } else {
      // Generate a random user ID if not present in localStorage
      const newUserId = generateRandomAddress();
      setUserId(newUserId);
      localStorage.setItem("userId", newUserId); // Save the new user ID to localStorage
    }

    setProposals(savedProposals); // Load saved proposals
    setVotedProposals(voted); // Load voted proposals
  }, []);

  useEffect(() => {
    // Save proposals and votedProposals to localStorage whenever they change
    localStorage.setItem("proposals", JSON.stringify(proposals));
    localStorage.setItem("votedProposals", JSON.stringify(votedProposals));
  }, [proposals, votedProposals]);

  const createProposal = () => {
    if (!newProposal) return;

    const proposalId = generateProposalId();  // Generate Proposal ID based on current date and time
    const timestamp = getTimestamp();
    const user = userId || generateRandomAddress();  // Use user ID or generate a new one if not logged in

    // Create a new proposal object
    const newProp = {
      id: proposalId,
      description: newProposal,
      votes: { "At variance": 0, "Skip/Neutral": 0, "Of one mind": 0 },
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
    // Check if the user has already voted for this proposal
    if (votedProposals.includes(id)) {
      setResultMessage("You have already voted on this proposal.");
      return;
    }

    if (!selectedVotes[id]) {
      setResultMessage("Please select a voting option.");
      return;
    }

    // Update proposals with new votes
    const updatedProposals = proposals.map((prop) =>
      prop.id === id
        ? { ...prop, votes: { ...prop.votes, [selectedVotes[id]]: prop.votes[selectedVotes[id]] + 1 } }
        : prop
    );

    setProposals(updatedProposals);
    const voteTimestamp = getTimestamp();

    setActivities([
      ...activities,
      {
        type: "Vote Cast",
        proposalId: id,
        timestamp: voteTimestamp,
        userId: userId || generateRandomAddress(),  // Store user ID or generate a new one
        vote: selectedVotes[id],  // Store the selected vote option for this proposal
      },
    ]);

    // Add the proposal ID to the list of voted proposals
    setVotedProposals([...votedProposals, id]);

    setResultMessage("Your vote has been cast!");
  };

  const handleVoteSelection = (proposalId, voteOption) => {
    // Update the selected vote for the given proposal
    setSelectedVotes((prevSelectedVotes) => ({
      ...prevSelectedVotes,
      [proposalId]: voteOption,
    }));
  };

  return (
    <div className="dao-container">
      <h1>Welcome to the Forum</h1>
      {userId && <p>Your unique ID: <strong>{userId}</strong></p>}

      <div className="proposal-section">
        <h2>Create Proposal</h2>
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
        <div className="proposal-container">
          {proposals.length === 0 ? (
            <p>No proposals yet</p>
          ) : (
            proposals.map((proposal) => (
              <div key={proposal.id} className="proposal-card">
                <h3>{proposal.description}</h3>
                <p>Votes: {proposal.votes["At variance"] + proposal.votes["Skip/Neutral"] + proposal.votes["Of one mind"]}</p>
                <p>Created at: {proposal.timestamp}</p>
                <p>Proposal ID: {proposal.id}</p>
                <p>Created by: {proposal.userId}</p>

                <div className="vote-options">
                  <button 
                    className={`vote-option at-variance ${selectedVotes[proposal.id] === "At variance" ? "selected" : ""}`}
                    onClick={() => handleVoteSelection(proposal.id, "At variance")}
                    disabled={votedProposals.includes(proposal.id)} // Disable vote if already voted
                  >
                    At variance
                  </button>
                  <button 
                    className={`vote-option skip-neutral ${selectedVotes[proposal.id] === "Skip/Neutral" ? "selected" : ""}`}
                    onClick={() => handleVoteSelection(proposal.id, "Skip/Neutral")}
                    disabled={votedProposals.includes(proposal.id)} // Disable vote if already voted
                  >
                    Skip/Neutral
                  </button>
                  <button 
                    className={`vote-option of-one-mind ${selectedVotes[proposal.id] === "Of one mind" ? "selected" : ""}`}
                    onClick={() => handleVoteSelection(proposal.id, "Of one mind")}
                    disabled={votedProposals.includes(proposal.id)} // Disable vote if already voted
                  >
                    Of one mind
                  </button>
                </div>

                <button onClick={() => voteOnProposal(proposal.id)} className="submit-btn" disabled={votedProposals.includes(proposal.id)}>
                  Submit Vote
                </button>

                {votedProposals.includes(proposal.id) && <PieChart votes={proposal.votes} />} {/* Display PieChart after submission */}
              </div>
            ))
          )}
        </div>
      </div>

      {resultMessage && <p>{resultMessage}</p>}

      <h2>Activity History</h2>
      <ActivityLog activities={activities} />
    </div>
  );
};

export default DAO;
