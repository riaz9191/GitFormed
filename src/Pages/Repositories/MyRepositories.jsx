import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyRepositories = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || "";
  const [repositories, setRepositories] = useState([]);
  const [sortOrder, setSortOrder] = useState("alphabetical");
  const [visibleRepositories, setVisibleRepositories] = useState(10);
  const [watchedRepositories, setWatchedRepositories] = useState([]);

  useEffect(() => {
    
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://gitformed-server.vercel.app/repositories?userEmail=${user.email}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gitformed-server.vercel.app/repositories/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const remaining = repositories.filter((repo) => repo._id !== id);
              setRepositories(remaining);
            }
          });
      }
    });
  };
  

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

    if (watchedRepositories.includes(repo._id)) {
      
      toast.info(`You are already watching this repository.`, {
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

      if (response.ok) {
        setWatchedRepositories((prevWatchedRepositories) => [
          repo._id,
          ...prevWatchedRepositories,
        ]);
        // alert("You are now watching this repository.");
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
        console.error("Error watching repository:",   toast.info(data.message, {
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
    <div >
      <div className="py-20 ">
        <div className="max-w-3xl mx-auto mt-8 p-8 bg-[#212e4d] text-white border-2 rounded shadow">
          <h2 className="text-3xl font-bold mb-6">Repository List</h2>

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
              Sort List
            </button>
          </div>
         {
          repositories.length > 0 ? 
          <ul>
          {repositories.slice(0, visibleRepositories).map((repo) => (
            <li
              key={repo._id}
              className="bg-[#000000] backdrop-filter backdrop-blur-md border-2 p-4 mb-2 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{repo.name}</h3>
                <p>
                  {/* Watchers: {repo.watchers} - */}
                  Created at: {repo.createdAt}
                </p>
              </div>
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                onClick={() => watchRepository(repo)}
              >
                Watch
              </button>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(repo._id)}
              >
                Delete
              </button>
              
            </li>
          ))}
        </ul> :
        <ul><p>You Don't have any repositories.Create one First</p></ul>
         }
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
    </div>
  );
};

export default MyRepositories;
