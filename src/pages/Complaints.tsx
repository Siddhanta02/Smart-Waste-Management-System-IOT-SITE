import React from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Ticket, Clock, MapPin, User, Trash2 } from 'lucide-react';

const Complaints = () => {
  const [complaints, setComplaints] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [localComplaints, setLocalComplaints] = React.useState(() => {
    const saved = sessionStorage.getItem('localComplaints');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    fetchComplaints();
  }, []);

  React.useEffect(() => {
    sessionStorage.setItem('localComplaints', JSON.stringify(localComplaints));
  }, [localComplaints]);

  const fetchComplaints = async () => {
    const { data, error } = await supabase
      .from('complaints')
      .select(`
        *,
        users (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch complaints');
    } else {
      setComplaints(data || []);
    }
  };

  const generateTicketNumber = () => {
    const prefix = 'COMP';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const ticketNumber = generateTicketNumber();
    const newComplaint = {
      id: Date.now().toString(),
      ticket_number: ticketNumber,
      title,
      description,
      location,
      status: 'pending',
      created_at: new Date().toISOString(),
      users: {
        full_name: 'Anonymous'
      }
    };

    // Add to local state first for immediate feedback
    setLocalComplaints([newComplaint, ...localComplaints]);

    // Clear form
    setTitle('');
    setDescription('');
    setLocation('');
    
    toast.success('Complaint submitted successfully!');
  };

  const removeComplaint = (complaintId) => {
    // Remove from local complaints
    setLocalComplaints(localComplaints.filter(c => c.id !== complaintId));
    toast.success('Complaint removed successfully');
  };

  const getStatusColor = (status) => {
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
      <h1 className="text-3xl font-bold mb-8">Submit a Complaint</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mb-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <Ticket className="h-5 w-5" />
            <span>Submit Complaint</span>
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-6">All Complaints</h2>
      <div className="grid gap-6">
        {/* Show local complaints first */}
        {localComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-semibold">{complaint.title}</h3>
                  <span className="text-sm text-gray-500">
                    (Ticket: {complaint.ticket_number})
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>Submitted by: {complaint.users?.full_name || 'Anonymous'}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{new Date(complaint.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
                <button
                  onClick={() => removeComplaint(complaint.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove complaint"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{complaint.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              Location: {complaint.location}
            </div>
          </div>
        ))}

        {/* Show backend complaints */}
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-semibold">{complaint.title}</h3>
                  <span className="text-sm text-gray-500">
                    (Ticket: {complaint.id.slice(0, 8).toUpperCase()})
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>Submitted by: {complaint.users?.full_name || complaint.users?.email || 'Anonymous'}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{new Date(complaint.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
                <button
                  onClick={() => removeComplaint(complaint.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove complaint"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{complaint.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              Location: {complaint.location}
            </div>
          </div>
        ))}

        {localComplaints.length === 0 && complaints.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;