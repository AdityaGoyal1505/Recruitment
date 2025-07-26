import React, { useState } from 'react';
import axios from 'axios';
import { User, Code, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RecruiterDetailsForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    designation: '',
    aboutCompany: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
      alert("User not logged in or missing ID");
      return;
    }

    const recruiterProfile = {
      user: {
        id: user.id
      },
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite,
      designation: formData.designation,
      aboutCompany: formData.aboutCompany
    };

    try {
      setLoading(true);
      await axios.post('https://recruitment-5dyc.onrender.com/api/recruiters/create', recruiterProfile, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Profile created successfully!');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Failed to create profile. Check console for details.');
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
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '20px',
          padding: '40px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <User size={32} style={{ color: '#FFD700' }} />
              <h1 style={{
                margin: 0,
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                Complete Your Profile
              </h1>
            </div>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              margin: 0
            }}>
              Help us get to know you better by sharing your company details
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Company Name */}
              <div>
                <label>
                  <User size={18} style={{ color: '#FFD700' }} /> Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #e1e5e9'
                  }}
                />
              </div>

              {/* Company Website */}
              <div>
                <label>
                  <User size={18} style={{ color: '#FFD700' }} /> Company Website *
                </label>
                <input
                  type="text"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  placeholder="Enter website URL"
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #e1e5e9'
                  }}
                />
              </div>

              {/* Designation */}
              <div>
                <label>
                  <Code size={18} style={{ color: '#FFD700' }} /> Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Recruiter"
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #e1e5e9'
                  }}
                />
              </div>

              {/* About Company */}
              <div>
                <label>
                  <Briefcase size={18} style={{ color: '#FFD700' }} /> About Company *
                </label>
                <textarea
                  name="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={handleInputChange}
                  placeholder="Tell us about the company"
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #e1e5e9',
                    minHeight: '120px'
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Submitting...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecruiterDetailsForm;
