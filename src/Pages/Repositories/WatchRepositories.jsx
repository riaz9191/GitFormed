import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WatchRepositories = () => {
  const { user } = useContext(AuthContext);
  const [watchedRepositories, setWatchedRepositories] = useState([]);
  const [newPullRequestFlag, setNewPullRequestFlag] = useState(false);

  const socket = io("https://gitformed-server.vercel.app/");

  useEffect(() => {
    // Fetch watched repositories from the server
    const fetchWatchedRepositories = async () => {
      try {
        const response = await fetch(
          `https://gitformed-server.vercel.app/watchedRepositories?userEmail=${user.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setWatchedRepositories(data);
        } else {
          console.error(
            "Error fetching watched repositories:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching watched repositories:", error.message);
      }
    };

    fetchWatchedRepositories();

    socket.on("pullRequestCreated", (newPullRequest) => {
      setNewPullRequestFlag(true);
    });
    return () => {
      socket.disconnect();
    };
  }, [user.email, socket]);

  useEffect(() => {
    socket.addEventListener("message", (event) => {
      const newPullRequest = JSON.parse(event.data);
      setNewPullRequestFlag(true);
      toast.info(`New pull request created: ${newPullRequest.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    return () => {
      socket.close();
    };
  }, [user.email, socket]);

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
        fetch(`https://gitformed-server.vercel.app/watchRepository/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success(`Unwatched! Your file has been Unwatched.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              const remaining = watchedRepositories.filter(
                (repo) => repo._id !== id
              );
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
        {newPullRequestFlag && (
          <div className="mb-4 bg-green-500 text-white p-2 rounded">
            New pull request created!
          </div>
        )}
        {watchedRepositories.length > 0 ? (
          <ul>
            {watchedRepositories.map((repo) => (
              <li
                key={repo.repositoryId}
                className="bg-[#000000] border-2 p-4 mb-2 rounded-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{repo.repoName}</h3>
                  <p>Created at: {repo.createdAt}</p>
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
        ) : (
          <ul>
            <p>You are not watching any repositories.</p>
          </ul>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default WatchRepositories;
