import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";


const Repositories = () => {
  const { user } = useContext(AuthContext);   
  const [repositories, setRepositories] = useState([]);
  const [sortOrder, setSortOrder] = useState("alphabetical");
  const [visibleRepositories, setVisibleRepositories] = useState(10);
  const [watchedRepositories, setWatchedRepositories] = useState([]);
  const userEmail = user?.email || "";
  // console.log(userEmail)
  useEffect(() => {
    // Fetch repositories from the server
    const fetchRepositories = async () => {
      try {
        const response = await fetch("https://gitformed-server.vercel.app/repositories");
        
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

  

  const watchRepository = async (repo) => {
    console.log(repo);
    console.log("Watching repository with ID:", repo._id);
    
    if (!user) {
    
      window.location.href = '/login'; 
      return;
    }
    
    if (watchedRepositories.includes(repo._id)) {
      
      toast.success(`You are already watching this repository.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const response = await fetch("https://gitformed-server.vercel.app/watchRepository", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repositoryId: repo._id,
          repoName: repo.name, 
          userEmail 
        }),
      });
      console.log(userEmail)

      if (response.ok) {
        setWatchedRepositories((prevWatchedRepositories) => [
          repo._id,
          ...prevWatchedRepositories,
        ]);
       
        toast.success(`You are now watching this repository.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        const data = await response.json();
        console.error("Error watching repository:", toast.info(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }));
      }
    } catch (error) {
      console.error("Error watching repository:", error.message);
    }
  };    
  return (
    <div className="py-20">
      <div className="max-w-3xl mx-auto mt-8 p-8 bg-[#212e4d] text-white border-2 rounded shadow">
        <h2 className="text-3xl font-bold mb-6">Repository List</h2>
        {/* <CreateRepository onRepositoryCreated={createRepository} /> */}
        {/* <WatchedRepositories watchedRepositories={watchedRepositories} /> */}
        {/* <PullRequest repositoryId={0} />{" "} */}
        {/* Pass the appropriate repositoryId */}
        <div className="flex items-center mb-4">
          <span className="mr-2">Sort by:</span>
          <select
            className="p-2 border rounded text-black"
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
              className="bg-[#000000] border-2 p-4 mb-2 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{repo.name}</h3>
                <p>
                  {/* Watchers: {repo.watchers}  */}
                  Created at: {repo.createdAt}
                </p>
              </div>
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                onClick={() => watchRepository(repo)}
              >
                Watch
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
