import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅
import './ApplyModal.css'; // Ensure you have styles for the modal

const ApplyModal = () => {
  const { jobId } = useParams(); // ✅ instead of useLocation
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log("Fetching job with ID:", jobId); // ✅ Confirm jobId
    if (jobId) {
      fetch(`https://recruitment-5dyc.onrender.com/api/jobs/${jobId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch job");
          return res.json();
        })
        .then(data => {
          console.log("Fetched job:", data);
          setJob(data);
        })
        .catch(err => {
          console.error(err);
          setError("Unable to load job details.");
        });
    }
  }, [jobId]);

  // Apply function
  const handleApply = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("You must be logged in to apply.");
      return;
    }

    try {
      const response = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          jobId: parseInt(jobId)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to apply for job");
      }

      setSuccess("Application submitted successfully!");
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!job) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Loading job...</h2>
          <button className="close-btn" onClick={() => navigate('/')}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Apply now </h2>

        <form onSubmit={handleApply}>
          <p>Click below to submit your application.</p>
          <button type="submit">Submit Application</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button className="close-btn" onClick={() => navigate('/')}>Close</button>
      </div>
    </div>
  );
};

export default ApplyModal;
