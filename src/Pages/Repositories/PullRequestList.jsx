// 
import React from "react";

const PullRequestList = ({ pullRequests }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Pull Requests</h2>
      <ul>
        {pullRequests.map((pullRequest) => (
          <li key={pullRequest._id} className="mb-2">
            <strong>ID:</strong> {pullRequest._id} <br />
            <strong>Title:</strong> {pullRequest.name} <br />
            <strong>Created at:</strong> {new Date(pullRequest.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PullRequestList;
