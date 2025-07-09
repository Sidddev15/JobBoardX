import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/jobs/my-applications").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Candidate Dashboard</h2>
      {jobs.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Status:</strong> Applied ✅</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CandidateDashboard;
