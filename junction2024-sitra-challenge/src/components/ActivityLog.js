// src/components/ActivityLog.js
import React from "react";

const ActivityLog = ({ activities }) => {
  return (
    <div className="activity-tab">
      <h2>Activity Log</h2>
      {activities.length === 0 ? (
        <p>No activities yet</p>
      ) : (
        activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <p><strong>{activity.type}</strong></p>
            {activity.type === "Proposal Created" && (
              <>
                <p>Content of the Proposal: {activity.text}</p>
                <p>Proposal ID: {activity.id}</p> 
                <p>Timestamp: {activity.timestamp}</p>{/* Display the Proposal ID */}
              </>
            )}
            {activity.type === "Vote Cast" && (
              <>
                <p>Vote Option: {activity.vote}</p> {/* Display the selected vote option */}
                <p>Proposal ID: {activity.proposalId}</p>
                <p>Timestamp: {activity.timestamp}</p>
              </>
            )}
            <p>Made by: {activity.userId}</p> {/* Displaying the user ID */}
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityLog;
