import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../components/JobCard';
import './Job.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search } from 'lucide-react';

const DEMO_JOBS = [
  {
    id: 'demo1',
    job_title: 'Demo Frontend Developer',
    company: 'Demo Corp',
    job_type: 'Full-time',
    location: 'Remote',
    salary: '$80,000',
    description: 'This is a demo job description for a frontend developer position at Demo Corp.',
    skills_required: ['JavaScript', 'React', 'CSS'],
    qualifications: ['Bachelor\'s degree in Computer Science', '3+ years of experience']
  },
  {
    id: '1',
    job_title: 'Frontend Developer',
    company: 'Acme Corp',
    job_type: 'Full-time',
    location: 'On-site',
    salary: '$70,000',
    description: 'This is a demo job description for a frontend developer position at Acme Corp.',
    skills_required: ['JavaScript', 'React', 'CSS'],
    qualifications: ['Bachelor\'s degree in Computer Science', '2+ years of experience']
  },
  {
    id: '2',
    job_title: 'Backend Developer',
    company: 'Beta Inc',
    job_type: 'Part-time',
    location: 'Remote',
    salary: '$60,000',
    description: 'This is a demo job description for a backend developer position at Beta Inc.',
    skills_required: ['Node.js', 'Express', 'MongoDB'],
    qualifications: ['Bachelor\'s degree in Computer Science', '3+ years of experience']
  }
];

function Job() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://recruitment-5dyc.onrender.com/api/jobs/all')
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setJobs(response.data);
        } else {
          console.warn('No jobs found, using demo jobs');
          setJobs(DEMO_JOBS);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setJobs(DEMO_JOBS);
        setLoading(false);
      });
  }, []);

  const jobTitles = Array.from(new Set(jobs.map(job => job.job_title || job.title || '')));
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const types = Array.from(new Set(jobs.map(job => job.job_type || job.type)));

  const filteredTitles = searchTerm
    ? jobTitles.filter(title =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredJobs = jobs.filter(job => {
    const locationMatch = locationFilter ? job.location === locationFilter : true;
    const typeMatch = typeFilter ? (job.job_type || job.type) === typeFilter : true;
    const searchMatch = searchTerm
      ? (job.job_title || job.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return locationMatch && typeMatch && searchMatch;
  });

  const handleApply = (job) => {
    navigate(`/apply/${job.id}`);
  };

  return (
    <>
      <Header />
      <div className="job-header">
        <h1>Find Jobs</h1>
        <p>This is where the job listings will be displayed.</p>
      </div>

      <div className="home-job-list">
        <h1>Available Jobs</h1>

        {/* Filter Section */}
        <div className="filter-section" style={{ position: 'relative' }}>
          <div className="input-button" style={{ position: 'relative' }}>
            <Search id="Search" />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              autoComplete="off"
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && filteredTitles.length > 0 && (
              <ul
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  border: '1px solid #ccc',
                  zIndex: 10,
                  borderRadius: '4px',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  maxHeight: '150px',
                  overflowY: 'auto'
                }}
              >
                {filteredTitles.map(title => (
                  <li
                    key={title}
                    style={{ padding: '8px', cursor: 'pointer' }}
                    onMouseDown={() => {
                      setSearchTerm(title);
                      setShowSuggestions(false);
                    }}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label>Location: </label>
            <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
              <option value="">All</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Type: </label>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="">All</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Job List */}
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="job-list-grid">
            {filteredJobs.length === 0 ? (
              <p>No jobs found for selected filters.</p>
            ) : (
              filteredJobs.map((job) => (
                <JobCard className="job-card"
                  key={job.id}
                  title={job.job_title || job.title}
                  type={job.job_type || job.type}
                  company={job.company || job.companyName}
                  location={job.location}
                  salary={job.salary}
                  description={job.description}
                  skills={job.skills_required || job.skills || []}
                  qualification={job.qualification}
                  onApply={() => handleApply(job)}
                />
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Job;
