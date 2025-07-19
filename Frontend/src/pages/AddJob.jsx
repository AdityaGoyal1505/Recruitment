import React, { useState } from 'react';
import axios from 'axios';
import './AddJob.css'; // Assuming you have some styles in this file

function AddJob() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    job_title: '',
    description: '',
    job_type: '',
    company: '',
    salary: '',
    location: '',
    qualification: '',
    skills_required: '',
    recruiter: {}, // recruiter object will be inserted using ID from localStorage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recruiterId = JSON.parse(localStorage.getItem('user'))?.id;
    if (!recruiterId) {
      alert("Recruiter ID not found in localStorage.");
      return;
    }

    const payload = {
      ...formData,
      skills_required: formData.skills_required.split(',').map(skill => skill.trim()),
      recruiter: { id: recruiterId }
    };

    try {
      const response = await axios.post("https://recruitment-5dyc.onrender.com/api/jobs/create", payload);
      alert("Job posted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Check console for details.");
    }
  };

  return (
    <div className="add-job-container p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="add-job-form space-y-4">

        {["name", "email", "phone", "job_title", "description", "job_type", "company", "salary", "location", "qualification"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace('_', ' ')}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills Required (comma separated)
          </label>
          <input
            type="text"
            name="skills_required"
            value={formData.skills_required}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., React, Node.js, MongoDB"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default AddJob;
