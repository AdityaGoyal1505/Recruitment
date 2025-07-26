import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
const NotFoundPage = () => {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-bold text-[#1b2653] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#1b2653] hover:bg-[#2d3b78] text-white px-5 py-2 rounded-md transition duration-300"
      >
        Go to Home
      </Link>
    </div>
    <Footer />
    </>
  );
};

export default NotFoundPage;
