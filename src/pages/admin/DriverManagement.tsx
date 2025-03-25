import React from 'react';
import { toast } from 'react-hot-toast';
import { Truck, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

// Sample data
const sampleDrivers = [
  {
    id: '1',
    vehicle_number: 'KA01MX1234',
    license_number: 'DL98765432',
    status: 'available',
    driver_tasks: []
  },
  {
    id: '2',
    vehicle_number: 'KA01MX5678',
    license_number: 'DL12345678',
    status: 'busy',
    driver_tasks: [
      {
        id: '1',
        complaint_id: 'COMP-123',
        status: 'assigned'
      }
    ]
  },
  {
    id: '3',
    vehicle_number: 'KA01MX9012',
    license_number: 'DL45678901',
    status: 'offline',
    driver_tasks: []
  }
];

const sampleComplaints = [
  {
    id: 'COMP-001',
    title: 'Overflowing Garbage Bin',
    description: 'The garbage bin near Central Park is overflowing',
    location: 'Central Park, Main Street'
  },
  {
    id: 'COMP-002',
    title: 'Illegal Dumping',
    description: 'Construction waste dumped on Park Road',
    location: 'Park Road, Near Shopping Mall'
  }
];

const DriverManagement = () => {
  const [drivers, setDrivers] = React.useState(sampleDrivers);
  const [complaints] = React.useState(sampleComplaints);
  const [vehicleNumber, setVehicleNumber] = React.useState('');
  const [licenseNumber, setLicenseNumber] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDriver = {
      id: Date.now().toString(),
      vehicle_number: vehicleNumber,
      license_number: licenseNumber,
      status: 'available',
      driver_tasks: []
    };

    setDrivers([...drivers, newDriver]);
    setVehicleNumber('');
    setLicenseNumber('');
    toast.success('Driver added successfully');
  };

  const updateDriverStatus = (driverId: string, newStatus: string) => {
    setDrivers(drivers.map(driver =>
      driver.id === driverId ? { ...driver, status: newStatus } : driver
    ));
    toast.success('Driver status updated');
  };

  const assignComplaint = (driverId: string, complaintId: string) => {
    setDrivers(drivers.map(driver => {
      if (driver.id === driverId) {
        return {
          ...driver,
          status: 'busy',
          driver_tasks: [...driver.driver_tasks, {
            id: Date.now().toString(),
            complaint_id: complaintId,
            status: 'assigned'
          }]
        };
      }
      return driver;
    }));
    toast.success('Task assigned successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Driver Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Driver</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                  License Number
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full flex items-center justify-center space-x-2"
              >
                <Truck className="h-5 w-5" />
                <span>Add Driver</span>
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pending Complaints</h2>
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{complaint.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {complaint.location}
                  </div>
                  <div className="flex justify-end">
                    <select
                      onChange={(e) => assignComplaint(e.target.value, complaint.id)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      defaultValue=""
                    >
                      <option value="" disabled>Assign Driver</option>
                      {drivers
                        .filter(d => d.status === 'available')
                        .map(driver => (
                          <option key={driver.id} value={driver.id}>
                            {driver.vehicle_number}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Drivers</h2>
          <div className="space-y-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{driver.vehicle_number}</h3>
                    <p className="text-sm text-gray-500">License: {driver.license_number}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      driver.status === 'available' ? 'bg-green-100 text-green-800' :
                      driver.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {driver.status}
                    </span>
                    <select
                      value={driver.status}
                      onChange={(e) => updateDriverStatus(driver.id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                </div>

                {driver.driver_tasks.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Current Tasks</h4>
                    {driver.driver_tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Complaint #{task.complaint_id}
                        </span>
                        <span className={`flex items-center ${
                          task.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {task.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 mr-1" />
                          )}
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;