import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const PullRequestList = () => {
  const { user } = useContext(AuthContext);
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const response = await fetch(`https://gitformed-server.vercel.app/pullRequests?userEmail=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setPullRequests(data);
          console.log(data);
        } else {
          console.error("Error fetching pull requests:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching pull requests:", error.message);
      }
    };

    fetchPullRequests();
  }, [user.email]);

  useEffect(() => {
    // Check for new pull requests and show notification
    const hasNewPullRequest = pullRequests.some(pr => pr.isNew);
    
    if (hasNewPullRequest) {
      toast.info("New pull request created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [pullRequests]);

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
          {pullRequests.length > 0 ? (
            <tbody>
              {pullRequests.map((pullRequest) => (
                <tr key={pullRequest._id} className="border">
                  <td className="border p-2">{pullRequest._id}</td>
                  <td className="border p-2">{pullRequest.name}</td>
                  <td className="border p-2">
                    {pullRequest.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="3" className="border p-2 text-center">
                  You haven't created any pull requests.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default PullRequestList;
