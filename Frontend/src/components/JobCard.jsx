import React from 'react';
import './JobCard.css';

// const JobCard = ({ title, company, location, type, salary, onApply }) => {
//   return (
//     <div className="job-card">
//       <div className="job-card-header">
//         <h2 className="job-title">{title}</h2>
//         <span className="job-type">{type}</span>
//       </div>
//       <p className="company-name">{company}</p>
//       <p className="job-location">{location}</p>
//       <p className="job-salary">💰 {salary}</p>
//       <button className="apply-button" onClick={onApply}>
//         Apply Now
//       </button>
//     </div>
//   );
// };

// Example JobCard component
function JobCard({ title, company, location, type, salary, onApply, description, skills, qualification, style }) {
  return (
    <div className="job-card" style={style}>
       <div className="job-card-header">
         <h2 className="job-title">{title}</h2>
         <span className="job-type">{type}</span>
         <span className="job-location">📍 {location}</span>
       </div>
       <p className="job-description">{description}</p>
       <p className="company-name">💼 {company}</p>
       <p className="job-salary">💰 {salary}</p>
       <p className="job-skills">🛠️ Skills: {Array.isArray(skills) ? skills.join(', ') : ''}</p>
       <p className="job-qualifications">🎓 Qualifications: {qualification}</p>
       <button className="apply-button" onClick={onApply}>
         Apply Now
       </button>
     </div>
  );
}


export default JobCard;
