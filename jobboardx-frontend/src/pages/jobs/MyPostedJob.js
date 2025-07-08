import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/jobs/my-jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>My Posted Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPostedJobs;
