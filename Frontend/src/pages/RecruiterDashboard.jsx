import React, { useState, useEffect } from 'react';
import {
  Mail, Building, Globe, User, Briefcase,
  MapPin, Calendar
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './RecruiterDashboard.css';
import { useNavigate } from 'react-router-dom';

function RecruiterDashboard() {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || !storedUser.id) {
          navigate('/login');
          return;
        }

        const userId = storedUser.id;

        const recruiterRes = await fetch(`https://recruitment-5dyc.onrender.com/api/recruiters/${userId}`);
        if (!recruiterRes.ok) throw new Error('Failed to load recruiter profile');
        const recruiterData = await recruiterRes.json();
        setRecruiter(recruiterData);

        const jobsRes = await fetch(`https://recruitment-5dyc.onrender.com/api/recruiters/${userId}/jobs`);
        if (!jobsRes.ok) throw new Error('Failed to load posted jobs');
        const jobsData = await jobsRes.json();
        setJobs(jobsData);

      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return <div className="dashboard-wrapper"><p>Loading dashboard...</p></div>;
  }

  if (error) {
    return <div className="dashboard-wrapper"><p style={{ color: 'red' }}>Error: {error}</p></div>;
  }

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-grid">

            {/* Profile Column */}
            <div className="profile-column">
              <div className="profile-card">
                <div className="profile-header">
                  <Building className="avatar-icon" />
                  <h2 className="profile-name">{recruiter.companyName}</h2>
                </div>

                <div className="profile-contact">
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <span>{recruiter.user.email}</span>
                  </div>
                  <div className="contact-item">
                    <Globe className="contact-icon" />
                    <a href={recruiter.companyWebsite} target="_blank" rel="noopener noreferrer">
                      {recruiter.companyWebsite}
                    </a>
                  </div>
                  <div className="contact-item">
                    <User className="contact-icon" />
                    <span>{recruiter.designation}</span>
                  </div>
                </div>

                <div className="about-card">
                  <h3>About Company</h3>
                  <p>{recruiter.aboutCompany}</p>
                </div>
              </div>
            </div>

            {/* Job Listing Column */}
            <div className="applications-column">
              <div className="applications-card">
                <div className="applications-header">
                  <h3 className="applications-title">
                    <Briefcase className="applications-icon" />
                    Posted Jobs
                  </h3>
                  <button
                    className="add-job-navigate-button"
                    onClick={() => navigate('/Addjob')}
                  >
                    + Navigate to Add Job Page
                  </button>
                </div>

                <div className="applications-content">
                  {jobs.length === 0 ? (
                    <p className="empty-description">No jobs posted yet.</p>
                  ) : (
                    <div className="applications-list">
                      {jobs.map(job => (
                        <div key={job.id} className="application-card">
                          <h4 className="application-title">{job.job_title}</h4>
                          <div className="application-meta">
                            <div className="meta-item">
                              <MapPin className="meta-icon" />
                              {job.location}
                            </div>
                            <div className="meta-item">
                              <Calendar className="meta-icon" />
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="application-footer">
                            <span className="application-salary">{job.salary}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecruiterDashboard;
