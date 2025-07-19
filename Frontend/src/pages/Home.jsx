// import './style.css';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import JobCard from '../components/JobCard';
// import ApplyModal from '../pages/ApplyModal';

// function App() {
//     const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Replace with your actual API URL
//     axios.get('http://localhost:8080/api/jobs')
//       .then((response) => {
//         setJobs(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching jobs:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleApply = (job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);  // Open modal
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="home">
//         <h1>Welcome to the Page</h1>
//         <br />
//         <p>Already having an account? <a href="/login">Login</a></p>
//         <p>Don't have an account? <a href="/register">Register</a></p>
//       </div>
//       <div className="home-job-list">
//       <h1>Available Jobs</h1>
//       {loading ? (
//         <p>Loading jobs...</p>
//       ) : (
//         <div className="job-list-grid">
//           {jobs.map((job) => (
//             <JobCard
//               key={job.id}
//               title={job.title}
//               company={job.companyName}
//               location={job.location}
//               type={job.type}
//               salary={job.salary}
//               onApply={() => handleApply(job)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Modal for applying */}
//       <ApplyModal 
//         job={selectedJob}
//         isOpen={isModalOpen}
//         closeModal={closeModal}
//       />
//     </div>
//     </>
//   );
// }

// export default App;

import './style.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Search, MapPin, Building, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DEMO_JOBS = [
  { id: 'demo1', title: 'Demo Frontend Developer', companyName: 'Demo Corp', type: 'Full-time', location: 'Remote', salary: '$80,000', description: 'This is a demo job description for a frontend developer position at Demo Corp.',skills: ['JavaScript', 'React', 'CSS'],qualifications: ['Bachelor\'s degree in Computer Science', '3+ years of experience'] },
  { id: '1', title: 'Frontend Developer', companyName: 'Acme Corp', type: 'Full-time', location: 'On-site', salary: '$70,000', description: 'This is a demo job description for a frontend developer position at Acme Corp.', skills: ['JavaScript', 'React', 'CSS'], qualifications: ['Bachelor\'s degree in Computer Science', '2+ years of experience'] },
  { id: '2', title: 'Backend Developer', companyName: 'Beta Inc', type: 'Part-time', location: 'Remote', salary: '$60,000', description: 'This is a demo job description for a backend developer position at Beta Inc.', skills: ['Node.js', 'Express', 'MongoDB'], qualifications: ['Bachelor\'s degree in Computer Science', '3+ years of experience'] },
  // Add more mock jobs as needed
];

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const jobTitles = Array.from(new Set(jobs.map(job => job.title)));
  const filteredTitles = searchTerm
    ? jobTitles.filter(title =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

    // Filter jobs based on selected filters and search term
    // (Handled below, so this block is removed to avoid redeclaration error)
  useEffect(() => {
    axios.get('https://recruitment-5dyc.onrender.com/api/jobs/all')
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setJobs(response.data);
        } else {
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

  const handleApply = (job) => {
    navigate(`/apply/${job.id}`);
  };

  // Get unique locations and types for filter dropdowns
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const types = Array.from(new Set(jobs.map(job => job.type)));

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter(job => {
    const locationMatch = locationFilter ? job.location === locationFilter : true;
    const typeMatch = typeFilter ? job.type === typeFilter : true;
    return locationMatch && typeMatch;
  });

  return (
    <>
      <Header />
      <section className="hero">
        <div>
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of opportunities from top companies worldwide</p>
          
          {/* Search Bar */}
          <div className="hero-search-container">
          {/* Input Group */}
          <div className="input-group" style={{ position: 'relative' }}>
            <Search />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click
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
                    style={{
                      padding: '8px',
                      cursor: 'pointer'
                    }}
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

            {/* Location Select */}
            <div className="location-group">
              <MapPin />
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="">All Locations</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            </div>

            {/* Button */}
            <button onClick={() => navigate('/jobs')} className="search-button">
              Search Jobs
            </button>
        </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div>
          <div>
            <div>
              <div>
                <Briefcase/>
              </div>
              <h3>10,000+</h3>
              <p>Active Job Listings</p>
            </div>
            <div>
              <div>
                <Building/>
              </div>
              <h3>5,000+</h3>
              <p>Trusted Companies</p>
            </div>
            <div>
              <div>
                <Users/>
              </div>
              <h3>100,000+</h3>
              <p>Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      <div className="home-job-list">
        <h1>Available Jobs</h1>

        {/* Filter Section */}
        <div className="filter-section">
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

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <>
            <div className="home-job-list-grid">
              {filteredJobs.length === 0 ? (
                <p>No jobs found for selected filters.</p>
              ) : (
                filteredJobs.slice(0, 5).map((job) => (
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
            {/* Show "View All Jobs" button if there are more than 5 jobs */}
            {filteredJobs.length > 2 && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button id='view-all-jobs-button'
                  onClick={() => navigate('/jobs')}
                >
                  View All Jobs 👉
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;