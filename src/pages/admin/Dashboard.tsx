import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Truck, MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

// Sample data
const sampleStats = {
  totalDrivers: 12,
  activeDrivers: 8,
  pendingComplaints: 5,
  resolvedComplaints: 15
};

const sampleComplaints = [
  {
    id: '1',
    title: 'Overflowing Garbage Bin',
    description: 'The garbage bin near Central Park is overflowing and needs immediate attention',
    location: 'Central Park, Main Street',
    status: 'pending',
    created_at: '2025-03-25T10:00:00Z',
    user: { full_name: 'John Doe' }
  },
  {
    id: '2',
    title: 'Illegal Dumping',
    description: 'Someone has dumped construction waste on the side of Park Road',
    location: 'Park Road, Near Shopping Mall',
    status: 'in_progress',
    created_at: '2025-03-24T15:30:00Z',
    user: { full_name: 'Jane Smith' }
  },
  {
    id: '3',
    title: 'Waste Collection Delayed',
    description: 'Regular waste collection has not happened for the past 3 days',
    location: 'Green Valley Apartments',
    status: 'resolved',
    created_at: '2025-03-23T09:15:00Z',
    user: { full_name: 'Mike Johnson' }
  }
];

const AdminDashboard = () => {
  const [complaints, setComplaints] = React.useState(sampleComplaints);

  const updateComplaintStatus = (complaintId: string, newStatus: string) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            to="/admin/drivers"
            className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow flex items-center space-x-2"
          >
            <Users className="h-5 w-5 text-green-600" />
            <span>Manage Drivers</span>
          </Link>
          <Link
            to="/admin/route-map"
            className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow flex items-center space-x-2"
          >
            <MapPin className="h-5 w-5 text-green-600" />
            <span>View Map</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Drivers</p>
              <p className="text-2xl font-semibold">{sampleStats.totalDrivers}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Drivers</p>
              <p className="text-2xl font-semibold">{sampleStats.activeDrivers}</p>
            </div>
            <Truck className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Complaints</p>
              <p className="text-2xl font-semibold">{sampleStats.pendingComplaints}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved Complaints</p>
              <p className="text-2xl font-semibold">{sampleStats.resolvedComplaints}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Complaints</h2>
        </div>
        <div className="divide-y">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{complaint.title}</h3>
                  <p className="text-gray-600">{complaint.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {complaint.user.full_name}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {complaint.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  {complaint.status === 'pending' && (
                    <button
                      onClick={() => updateComplaintStatus(complaint.id, 'in_progress')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Truck className="h-4 w-4" />
                      <span>Assign Driver</span>
                    </button>
                  )}
                  {complaint.status === 'in_progress' && (
                    <button
                      onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;