import React, { useState } from 'react';
import axios from 'axios';
import {
  Upload, User, FileText, Code, Briefcase, BookOpen
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CompleteStudent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    resume: null,
    branch: '',
    skills: '',
    bio: ''
  });

  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const branches = [
    'Computer Science & Engineering', 'Information Technology',
    'Electronics & Communication', 'Mechanical Engineering',
    'Civil Engineering', 'Electrical Engineering',
    'Chemical Engineering', 'Aerospace Engineering',
    'Biotechnology', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setFormData(prev => ({ ...prev, resume: file }));
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.includes('document')) {
        setFormData(prev => ({ ...prev, resume: file }));
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.resume || !formData.branch || !formData.skills || !formData.bio) {
      alert('Please fill in all required fields');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      alert('User session expired. Please login again.');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('userId', storedUser.id); // Backend must link this to User
    data.append('fullName', formData.fullName);
    data.append('resume', formData.resume);
    data.append('branch', formData.branch);
    data.append('skills', formData.skills);
    data.append('bio', formData.bio);

    try {
      await axios.post('https://recruitment-5dyc.onrender.com/api/students/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Profile completed successfully!');
      window.location.href = '/studentdashboard';
    } catch (error) {
      alert('Failed to submit details. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'white',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <User size={32} style={{ color: '#FFD700' }} />
              <h1 style={{
                margin: 0,
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>Complete Your Profile</h1>
            </div>
            <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
              Help us get to know you better by sharing your details
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
                  <User size={18} style={{ color: '#FFD700' }} /> Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label style={labelStyle}><FileText size={18} style={{ color: '#FFD700' }} /> Resume *</label>
                <div
                  style={{
                    border: `2px dashed ${dragActive ? '#FFD700' : '#d1d5db'}`,
                    borderRadius: '12px',
                    padding: '40px',
                    textAlign: 'center',
                    backgroundColor: dragActive ? '#FFFACD' : '#fafbfc',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('resume-upload').click()}
                >
                  <Upload size={32} style={{ color: '#FFD700', marginBottom: '12px' }} />
                  {formData.resume ? (
                    <>
                      <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{formData.resume.name}</p>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Click to change file</p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: '600' }}>Drop your resume here or click to browse</p>
                      <p style={{ fontSize: '0.9rem', color: '#666' }}>PDF or Word documents only</p>
                    </>
                  )}
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    required
                  />
                </div>
              </div>

              {/* Branch */}
              <div>
                <label style={labelStyle}><BookOpen size={18} style={{ color: '#FFD700' }} /> Branch/Department *</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select your branch</option>
                  {branches.map((b, idx) => <option key={idx} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Skills */}
              <div>
                <label style={labelStyle}><Code size={18} style={{ color: '#FFD700' }} /> Skills *</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript, React, Python"
                  required
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                />
              </div>

              {/* Bio */}
              <div>
                <label style={labelStyle}><Briefcase size={18} style={{ color: '#FFD700' }} /> Bio *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about your interests and goals"
                  required
                  style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '18px 40px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Uploading...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

const inputStyle = {
  width: '100%',
  padding: '16px',
  border: '2px solid #e1e5e9',
  borderRadius: '12px',
  fontSize: '1rem',
  backgroundColor: '#fafbfc',
  outline: 'none',
  transition: 'all 0.3s ease'
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  fontWeight: '600',
  fontSize: '1.1rem'
};

export default CompleteStudent;