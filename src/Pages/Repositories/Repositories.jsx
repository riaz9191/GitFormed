import React, { useEffect, useState } from "react";

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [sortOrder, setSortOrder] = useState("alphabetical");
  const [visibleRepositories, setVisibleRepositories] = useState(10);
  const [watchedRepositories, setWatchedRepositories] = useState([]);

  useEffect(() => {
    // Fetch repositories from the server
    const fetchRepositories = async () => {
      try {
        const response = await fetch("http://localhost:5000/repositories");
        if (response.ok) {
          const data = await response.json();
          setRepositories(data.regularRepositories);
          setWatchedRepositories(
            data.watchedRepositories.map((repo) => {
              repo.id;
            })
          );
        } else {
          console.error("Error fetching repositories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching repositories:", error.message);
      }
    };

    fetchRepositories();
  }, []);

  const sortRepositories = () => {
    let sortedRepositories = [...repositories];
    switch (sortOrder) {
      case "alphabetical":
        sortedRepositories = sortedRepositories.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "latest":
        sortedRepositories = sortedRepositories.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "watchers":
        sortedRepositories = sortedRepositories.sort(
          (a, b) => b.watchers - a.watchers
        );
        break;
      default:
        break;
    }
    setRepositories(sortedRepositories);
  };

  const loadMoreRepositories = () => {
    setVisibleRepositories((prevCount) => prevCount + 10);
  };

  const createRepository = (newRepository) => {
    setRepositories((prevRepositories) => [newRepository, ...prevRepositories]);
  };

  const watchRepository = async (repo) => {
    console.log(repo);
    console.log("Watching repository with ID:", repo._id);
    if (watchedRepositories.includes(repo._id)) {
      alert("You are already watching this repository.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/watchRepository", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repositoryId: repo._id,
          repoName: repo.name, // Include the repository name
        }),
      });

      if (response.ok) {
        setWatchedRepositories((prevWatchedRepositories) => [
          repo._id,
          ...prevWatchedRepositories,
        ]);
        alert("You are now watching this repository.");
      } else {
        const data = await response.json();
        console.error("Error watching repository:", data.message);
      }
    } catch (error) {
      console.error("Error watching repository:", error.message);
    }
  };
  return (
    <div>
      <div className="max-w-3xl mx-auto mt-8 p-8 bg-white rounded shadow">
        <h2 className="text-3xl font-bold mb-6">Repository List</h2>
        {/* <CreateRepository onRepositoryCreated={createRepository} /> */}
        {/* <WatchedRepositories watchedRepositories={watchedRepositories} /> */}
        {/* <PullRequest repositoryId={0} />{" "} */}
        {/* Pass the appropriate repositoryId */}
        <div className="flex items-center mb-4">
          <span className="mr-2">Sort by:</span>
          <select
            className="p-2 border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="latest">Latest</option>
            <option value="watchers">Number of Watchers</option>
          </select>
          <button
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={sortRepositories}
          >
            Sort
          </button>
        </div>
        <ul>
          {repositories.slice(0, visibleRepositories).map((repo) => (
            <li
              key={repo._id}
              className="bg-gray-100 p-4 mb-2 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{repo.name}</h3>
                <p>
                  Watchers: {repo.watchers} - Created at: {repo.createdAt}
                </p>
              </div>
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                onClick={() => watchRepository(repo)}
              >
                Watch
              </button>
              <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700">
                View Details
              </button>
            </li>
          ))}
        </ul>
        {visibleRepositories < repositories.length && (
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={loadMoreRepositories}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Repositories;
