import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/jobs/my-jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Recruiter Dashboard</h2>
      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <h4>Applicants:</h4>
          {job.applicants.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <ul>
              {job.applicants.map((app) => (
                <li key={app._id}>{app.name} - {app.email}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecruiterDashboard;
