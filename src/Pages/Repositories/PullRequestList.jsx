import React, { useEffect, useState } from "react";

const PullRequestList = () => {
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    // Fetch pull requests from the server
    const fetchPullRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/pullRequests");
        if (response.ok) {
          const data = await response.json();
          setPullRequests(data);
        } else {
          console.error("Error fetching pull requests:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching pull requests:", error.message);
      }
    };

    fetchPullRequests();
  }, []); 

  return (
    <div className="py-20">
      <div className="max-w-3xl mx-auto mt-8 p-8 bg-[#212e4d] text-white border-2 rounded shadow">
        <h2 className="text-3xl font-bold mb-6">Pull Requests</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Created at</th>
            </tr>
          </thead>
          <tbody>
            {pullRequests.map((pullRequest) => (
              <tr key={pullRequest._id} className="border">
                <td className="border p-2">{pullRequest._id}</td>
                <td className="border p-2">{pullRequest.name}</td>
                <td className="border p-2">
                {new Date(pullRequest.createdAt).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PullRequestList;
