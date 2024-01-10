import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const CreateRepository = ({  }) => {
  const { user } = useContext(AuthContext);
  const [repoName, setRepoName] = useState("");
  const userEmail = user?.email || "";


  const handleCreateRepository = async (e) => {
    e.preventDefault();

    if (!validateRepositoryName(repoName)) {
      
      toast.success(`Invalid repository name. It must match the pattern [A-Za-z0-9-_]{5,10].`, {
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
      const newRepository = {
        name: repoName,
        createdAt: new Date().toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" }),
        userEmail,
      };
      console.log(newRepository);
  
      const response = await fetch('https://gitformed-server.vercel.app/createRepository', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRepository),
      });
      console.log(response)
  
      if (response.ok) {
        toast.success(`Successfully Created!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const createdRepository = await response.json();
        setRepoName(""); 
        console.log('Repository created:', createdRepository);
  
      } else {
        const errorData = await response.json();
  
        if (response.status === 400 && errorData.message.includes("Repository name already exists")) {
          // Alert if the repository name already exists
          toast.info(`Repository name already exists. Please choose a different name.`, {
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
   
          console.error('Error during repository creation:', response.statusText);
          console.error('Error creating repository:', errorData.message);
        }
      }
    } catch (error) {
      console.error('Error during repository creation:', error.message);
      console.error('Error creating repository:', error);
    }
  };
  

  const validateRepositoryName = (name) => {
    const regex = /^[A-Za-z0-9-_]{5,10}$/;
    return regex.test(name);
  };

  return (
   <div className="py-20">
     <div className="max-w-md mx-auto mt-8 p-8 bg-[#212e4d] text-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Create Repository</h2>
      <form onSubmit={handleCreateRepository}>
        <label className="block mb-2 text-sm font-semibold">Repository Name:</label>
        <input
          className="w-full p-2 border rounded text-black"
          type="text"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Create Repository
        </button>
      </form>
    </div>
   </div>
  );
};

export default CreateRepository;
