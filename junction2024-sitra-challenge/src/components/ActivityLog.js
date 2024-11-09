import React, { useState } from "react";

const ActivityLog = ({ activities }) => {
  const [selectedProposalId, setSelectedProposalId] = useState(null); // Track selected proposal ID
  const [selectedActivity, setSelectedActivity] = useState(null); // Track selected activity item

  // Handle click on a proposal activity
  const handleActivityClick = (proposalId, index) => {
    setSelectedProposalId(proposalId); // Set selected proposal ID on click
    setSelectedActivity(index); // Set selected activity item index
  };

  // Filter activities based on Proposal ID (for votes)
  const filteredVotes = activities.filter(
    (activity) => activity.type === "Vote Cast" && activity.proposalId === selectedProposalId
  );

  return (
    <div className="activity-log-container">
      {/* Proposal Created Section */}
      <div className="proposal-created">
        <h3>Proposal Created</h3>
        {activities
          .filter((activity) => activity.type === "Proposal Created")
          .map((activity, index) => (
            <div
              key={index}
              className={`activity-item ${selectedActivity === index ? "selected" : ""}`} // Add "selected" class to the clicked item
              onClick={() => handleActivityClick(activity.id, index)} // Set the selected proposal ID and index
            >
              <p>{activity.text}</p>
              <p>Proposal ID: {activity.id}</p>
              <p>Timestamp: {activity.timestamp}</p>
              <p>Created by: {activity.userId}</p>
            </div>
          ))}
      </div>

      {/* Vote Cast Section */}
      <div className="vote-cast">
        <h3>Vote Cast</h3>
        {filteredVotes.length === 0 ? (
          <p>No votes for this proposal</p> // Message when there are no votes for the selected proposal
        ) : (
          filteredVotes.map((activity, index) => (
            <div key={index} className="activity-item">
              <p>Vote Cast: {activity.vote}</p>
              <p>Proposal ID: {activity.proposalId}</p>
              <p>Timestamp: {activity.timestamp}</p>
              <p>Voted by: {activity.userId}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;

