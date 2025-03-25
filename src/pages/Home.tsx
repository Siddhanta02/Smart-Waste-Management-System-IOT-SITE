import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Truck, ShoppingBag, BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[600px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Smart Waste Management for a Cleaner Future
            </h1>
            <p className="text-xl mb-8">
              Join us in our mission to create a sustainable environment through efficient waste management
            </p>
            <Link
              to="/login"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Truck className="h-8 w-8" />}
              title="Smart Collection"
              description="Efficient waste collection system with real-time tracking"
            />
            <FeatureCard
              icon={<Recycle className="h-8 w-8" />}
              title="Recycling"
              description="Proper segregation and recycling of waste materials"
            />
            <FeatureCard
              icon={<ShoppingBag className="h-8 w-8" />}
              title="Eco Market"
              description="Shop sustainable and recycled products"
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8" />}
              title="Education"
              description="Learn about waste management and environmental impact"
            />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="10,000+" label="Active Users" />
            <StatCard number="50,000+" label="Complaints Resolved" />
            <StatCard number="100+" label="Recycling Centers" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    <div className="text-green-600 flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div>
    <div className="text-4xl font-bold mb-2">{number}</div>
    <div className="text-xl">{label}</div>
  </div>
);

export default Home;