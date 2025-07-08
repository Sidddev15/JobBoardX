import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const MyApplications = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/jobs/my-applications").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Jobs I've Applied To</h2>
      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
