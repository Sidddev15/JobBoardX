import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  console.log("Current user:", user);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = () => {
    axios.get("/jobs/my-jobs").then((res) => setJobs(res.data));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this job?")) {
      await axios.delete(`/jobs/${id}`);
      fetchJobs();
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`/jobs/${editingJob._id}`, editingJob);
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      alert("Failed to update");
    }
  };

  return (
    <div>
      <h2>My Posted Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          {editingJob?._id === job._id ? (
            <>
              <input
                value={editingJob.title}
                onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
              />
              <textarea
                value={editingJob.description}
                onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
              />
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setEditingJob(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button onClick={() => setEditingJob(job)}>Edit</button>
              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyPostedJobs;