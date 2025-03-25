import React from 'react';
import { MapPin, Trash2, Route } from 'lucide-react';

const dustbinPoints = [
  {
    id: 1,
    name: 'Central Park Collection Point',
    location: { lat: 12.9716, lng: 77.5946 },
    status: 'full',
    lastPickup: '2025-03-25T08:00:00Z'
  },
  {
    id: 2,
    name: 'Market Area Bin',
    location: { lat: 12.9815, lng: 77.5921 },
    status: 'half-full',
    lastPickup: '2025-03-24T16:30:00Z'
  },
  {
    id: 3,
    name: 'Residential Complex',
    location: { lat: 12.9732, lng: 77.6244 },
    status: 'empty',
    lastPickup: '2025-03-25T07:15:00Z'
  },
  {
    id: 4,
    name: 'Shopping Mall',
    location: { lat: 12.9592, lng: 77.6974 },
    status: 'full',
    lastPickup: '2025-03-24T18:45:00Z'
  },
  {
    id: 5,
    name: 'Tech Park',
    location: { lat: 12.9516, lng: 77.5945 },
    status: 'half-full',
    lastPickup: '2025-03-25T06:30:00Z'
  }
];

const RouteMap = () => {
  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'full':
        return 'bg-red-100 text-red-800';
      case 'half-full':
        return 'bg-yellow-100 text-yellow-800';
      case 'empty':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Route Map</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Route className="h-5 w-5" />
          <span>Optimize Route</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative">
            <div className="w-full h-[600px] bg-gray-100 rounded-lg">
              {/* Map placeholder - In production, integrate with a real map service */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">
                    (Integration with map service required)
                  </p>
                </div>
              </div>
              {/* Simulated map markers */}
              {dustbinPoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`absolute p-2 rounded-full ${
                    point.status === 'full' ? 'bg-red-500' :
                    point.status === 'half-full' ? 'bg-yellow-500' :
                    'bg-green-500'
                  } text-white transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform`}
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Collection Points</h2>
            <div className="space-y-4">
              {dustbinPoints.map((point) => (
                <div
                  key={point.id}
                  className={`p-4 rounded-lg border ${
                    selectedPoint?.id === point.id ? 'border-green-500' : 'border-gray-200'
                  } cursor-pointer hover:border-green-500 transition-colors`}
                  onClick={() => setSelectedPoint(point)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{point.name}</h3>
                      <p className="text-sm text-gray-500">
                        {point.location.lat.toFixed(4)}, {point.location.lng.toFixed(4)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(point.status)}`}>
                      {point.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Last pickup: {new Date(point.lastPickup).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedPoint && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Point Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={selectedPoint.status}
                  >
                    <option value="empty">Empty</option>
                    <option value="half-full">Half Full</option>
                    <option value="full">Full</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Pickup</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(selectedPoint.lastPickup).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1 text-gray-900">
                    Lat: {selectedPoint.location.lat.toFixed(4)},
                    Lng: {selectedPoint.location.lng.toFixed(4)}
                  </p>
                </div>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Schedule Pickup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteMap;