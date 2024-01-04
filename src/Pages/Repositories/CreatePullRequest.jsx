//
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const CreatePullRequest = ({ repositoryId, onPullRequestCreated }) => {
  const { user } = useContext(AuthContext);
  const [pullRequestTitle, setPullRequestTitle] = useState("");
  const userEmail = user?.email || "";

  const handleCreatePullRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/createPullRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repositoryId,
          name: pullRequestTitle,
          createdAt: new Date().toLocaleDateString("en-GB"),
          userEmail,
        }),
      });

      if (response.ok) {
        const createdPullRequest = await response.json();
        onPullRequestCreated(createdPullRequest);
        setPullRequestTitle(""); // Clear the input field
        console.log("Pull request created:", createdPullRequest);
      } else {
        const errorData = await response.json();
        console.error("Error during pull request creation:", errorData.message);
      }
    } catch (error) {
      console.error("Error during pull request creation:", error);
    }
  };

  return (
    <div className="mb-4 pt-20">
      <div className="max-w-3xl mx-auto mt-8 p-8 bg-[#212e4d] text-white border-2 rounded shadow">
        <h2 className="text-xl text-white font-semibold mb-2">
          Create Pull Request
        </h2>
        <form onSubmit={handleCreatePullRequest}>
          <label className="block text-white  mb-2 text-sm font-semibold">
            Pull Request Title:
          </label>
          <input
            className="w-full p-2 border rounded text-black"
            type="text"
            value={pullRequestTitle}
            onChange={(e) => setPullRequestTitle(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
            type="submit"
          >
            Create Pull Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePullRequest;
