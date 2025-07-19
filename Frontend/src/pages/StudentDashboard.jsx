import React, { useEffect, useState } from 'react';
import {
  User, FileText, Briefcase, MapPin, Mail,
  Calendar, TrendingUp, Clock, CheckCircle,
  XCircle, AlertCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import './StudentDashboard.css';
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    resumeLink: '',
    location: '',
    bio: '',
    skills: [],
    joinedDate: '',
    profileImage: null
  });

  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, shortlisted: 0, rejected: 0 });
  const [error, setError] = useState(false);

  const fallbackData = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "ABC Tech",
      status: "Under Review",
      appliedDate: "2024-06-15",
      location: "Remote",
      salary: "$75,000 - $90,000"
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "XYZ Labs",
      status: "Shortlisted",
      appliedDate: "2024-06-10",
      location: "San Francisco, CA",
      salary: "$80,000 - $95,000"
    },
    {
      id: 3,
      title: "React Developer",
      company: "Tech Innovations",
      status: "Rejected",
      appliedDate: "2024-06-05",
      location: "New York, NY",
      salary: "$70,000 - $85,000"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.id) {
          navigate('/login');
          return;
        }

        const userId = storedUser.id;

        // Fetch student profile
        const profileRes = await axios.get(`https://recruitment-5dyc.onrender.com/api/students/${userId}`);
        const profile = profileRes.data;

        // Convert comma-separated skills to array
        const parsedSkills = profile.skills
          ? profile.skills.split(',').map(s => s.trim())
          : [];

        setUser({
          fullName: profile.fullName,
          email: profile.user.email,
          resumeLink: profile.resumeLink,
          location: profile.user.location || 'Unknown',
          bio: profile.bio,
          skills: parsedSkills,
          joinedDate: profile.user.joinedDate || '2024',
          profileImage: null
        });

        // Fetch job applications
        const appRes = await axios.get(`https://recruitment-5dyc.onrender.com/api/applications/student/${userId}`);
        const app = appRes.data;
        console.log(appRes.data);
        setApplications(app.map(application => ({
          id: application.id,
          title: application.job.job_title,
          company: application.job.company,
          location: application.job.location,
          salary: application.job.salary,
          status: application.status,
          appliedAt: application.appliedAt
        })));

        const total = app.length;
        const pending = app.filter(app => app.status.toLowerCase() === 'under review').length;
        const shortlisted = app.filter(app => app.status.toLowerCase() === 'shortlisted').length;
        const rejected = app.filter(app => app.status.toLowerCase() === 'rejected').length;
        setStats({ total, pending, shortlisted, rejected });

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
        setApplications(fallbackData);

        const total = fallbackData.length;
        const pending = fallbackData.filter(app => app.status.toLowerCase() === 'under review').length;
        const shortlisted = fallbackData.filter(app => app.status.toLowerCase() === 'shortlisted').length;
        const rejected = fallbackData.filter(app => app.status.toLowerCase() === 'rejected').length;
        setStats({ total, pending, shortlisted, rejected });
      }
    };

    fetchData();
  }, [navigate]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'shortlisted': return <CheckCircle className="status-icon" />;
      case 'under review': return <Clock className="status-icon" />;
      case 'rejected': return <XCircle className="status-icon" />;
      default: return <AlertCircle className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'shortlisted': return 'status-shortlisted';
      case 'under review': return 'status-under-review';
      case 'rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

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
                  <div className="profile-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <h2 className="profile-name">{user.fullName}</h2>
                </div>
                <div className="profile-contact">
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="resume-section">
                  <div className="resume-header">
                    <h3>Resume</h3>
                    <FileText className="resume-icon" />
                  </div>
                  {user.resumeLink ? (
                    <a
                      href={user.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-button primary"
                    >
                      <FileText className="button-icon" />
                      View Resume
                    </a>
                  ) : (
                    <button className="resume-button secondary">
                      Upload Resume
                    </button>
                  )}
                </div>
              </div>

              {/* About Me */}
              <div className="about-card">
                <h3 className="about-title">About Me</h3>
                <p className="about-bio">{user.bio}</p>
                <h4 className="skills-title">Skills</h4>
                <div className="skills-container">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="stats-card">
                <h3 className="stats-title">
                  <TrendingUp className="stats-icon" />
                  Quick Stats
                </h3>
                <div className="stats-grid">
                  <div className="stat-item total">
                    <div className="stat-number">{stats.total}</div>
                    <div className="stat-label">Total Applied</div>
                  </div>
                  <div className="stat-item shortlisted">
                    <div className="stat-number">{stats.shortlisted}</div>
                    <div className="stat-label">Shortlisted</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications Column */}
            <div className="applications-column">
              <div className="applications-card">
                <div className="applications-header">
                  <div className="applications-title-section">
                    <h3 className="applications-title">
                      <Briefcase className="applications-icon" />
                      Job Applications
                    </h3>
                    <button className="new-job-button" onClick={() => navigate('/jobs')}>
                      Apply to New Job
                    </button>
                  </div>

                  {error && (
                    <div className="error-alert">
                      <AlertCircle className="error-icon" />
                      <span>Backend not reachable. Showing demo data.</span>
                    </div>
                  )}
                </div>

                <div className="applications-content">
                  {applications.length === 0 ? (
                    <div className="empty-state">
                      <Briefcase className="empty-icon" />
                      <h4 className="empty-title">No applications yet</h4>
                      <p className="empty-description">Start applying to jobs to see them here.</p>
                      <button className="browse-jobs-button" onClick={() => navigate('/jobs')}>
                        Browse Jobs
                      </button>
                    </div>
                  ) : (
                    <div className="applications-list">
                      {applications.map((app) => (
                        <div key={app.id} className="application-card">
                          <div className="application-header">
                            <div className="application-info">
                              <h4 className="application-title">{app.title}</h4>
                              <p className="application-company">{app.company}</p>
                              <div className="application-meta">
                                <div className="meta-item">
                                  <MapPin className="meta-icon" />
                                  {app.location}
                                </div>
                                <div className="meta-item">
                                  <Calendar className="meta-icon" />
                                  Applied {formatDate(app.appliedAt)}
                                </div>
                              </div>
                            </div>
                            <div className={`application-status ${getStatusClass(app.status)}`}>
                              {getStatusIcon(app.status)}
                              <span>{app.status}</span>
                            </div>
                          </div>
                          <div className="application-footer">
                            <span className="application-salary">{app.salary}</span>
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

export default StudentDashboard;
