import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const WatchRepositories = () => {
  const { user } = useContext(AuthContext);
  const [watchedRepositories, setWatchedRepositories] = useState([]);

  useEffect(() => {
    // Fetch watched repositories from the server
    const fetchWatchedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/watchedRepositories?userEmail=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setWatchedRepositories(data);
        } else {
          console.error("Error fetching watched repositories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching watched repositories:", error.message);
      }
    };

    fetchWatchedRepositories();
  }, [user.email]); // Fetch watched repositories when the user's email changes

  const unwatchRepository = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unwatch it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/watchRepository/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been Unwatched.", "success");
              const remaining = watchedRepositories.filter((repo) => repo._id !== id);
              setWatchedRepositories(remaining);
            }
          });
      }
    });
  };
  
  return (
    <div className="py-20">
      <div className="max-w-3xl mx-auto mt-8 p-8 bg-[#212e4d] text-white border-2 rounded shadow">
        <h2 className="text-3xl font-bold mb-6">Watched Repositories</h2>
        <ul>
          {watchedRepositories.map((repo) => (
            <li
              key={repo.repositoryId}
              className="bg-[#000000] border-2 p-4 mb-2 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{repo.repoName}</h3>
                <p>
                  Created at: {new Date(repo.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                onClick={() => unwatchRepository(repo._id)}
              >
                Unwatch
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WatchRepositories;
