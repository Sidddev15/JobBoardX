import { useState, useEffect, useContext } from "react";
import axios from "../../api/axiosInstance";
import { AuthContext } from "../../auth/AuthContext";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("/jobs/all").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.map((job) => (
        <div
          key={job._id}
          style={{ border: "1px solid #F5F6FA", margin: 10, padding: 10 }}
        >
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>
            <strong>Company: </strong>
            {job.company}
          </p>
          <p>
            <strong>Location: </strong>
            {job.location}
          </p>
          <p>
            <strong>Salary Range: </strong>
            {job.salaryRange}
          </p>
          {user?.role === "candidate" && (
            <button
              onClick={() =>
                axios
                  .post(`/jobs/apply/${job._id}`)
                  .then(() => alert("Applied"))
              }
            >
              Apply
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllJobs;