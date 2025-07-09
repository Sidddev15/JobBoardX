import { useState } from "react";
import axios from "../../api/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const PostJobs = () => {
  const { user } = useContext(AuthContext);
  console.log("Current user:", user);
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salaryRange: "",
  });

  const handleChange = (e) =>
    setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jobs/create", job);
      alert("Job posted sucessfully");
      setJob({
        title: "",
        description: "",
        company: "",
        location: "",
        salaryRange: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div>
      <h2>Post A New Job</h2>
      <form onSubmit={handleSubmit}>
        {["title", "description", "company", "location", "salaryRange"].map(
          (field) => (
            <input
              key={field}
              name={field}
              value={job[field]}
              onChange={handleChange}
              placeholder={field}
              style={{ display: "block", margin: 8 }}
            />
          )
        )}
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};


export default PostJobs;