import React from 'react';
import { BookOpen, Recycle, Trash2, X, Leaf, Battery, Factory, Award } from 'lucide-react';

const articles = {
  wasteManagement: {
    title: 'Understanding Waste Management',
    content: `
      Waste management is a comprehensive system of collecting, transporting, and processing waste materials. It's crucial for maintaining public health, environmental quality, and sustainable development.

      Key Components:
      1. Collection: Regular gathering of waste from households and businesses
      2. Transportation: Moving waste to processing facilities
      3. Processing: Converting waste into less harmful substances or useful materials
      4. Disposal: Safe placement of unusable waste in designated facilities

      The waste management hierarchy prioritizes:
      1. Reduce: Minimizing waste generation
      2. Reuse: Using items multiple times
      3. Recycle: Converting waste into new products
      4. Recovery: Extracting energy from waste
      5. Disposal: Safe disposal of remaining waste

      Impact on Climate Change:
      Proper waste management plays a crucial role in reducing greenhouse gas emissions:
      - Methane reduction from landfills
      - Carbon dioxide reduction through recycling
      - Energy conservation through material recovery
      - Reduced transportation emissions through efficient collection
    `,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
        caption: 'Modern waste management facility'
      },
      {
        url: 'https://images.unsplash.com/photo-1618477462146-817c6a1f2161',
        caption: 'Recycling process in action'
      }
    ]
  },
  wastecrisis: {
    title: 'The Waste Crisis in India',
    content: `
      India faces significant challenges in managing its urban waste, with major cities generating thousands of tons of waste daily. The situation has reached critical levels due to rapid urbanization and changing consumption patterns.

      Current Statistics:
      - 62 million tonnes of waste generated annually
      - Only 20% of waste properly processed
      - 31 million tonnes of waste remains untreated and dumped in landfills

      Major Challenges:
      1. Inadequate Infrastructure
         - Limited processing facilities
         - Outdated collection systems
         - Insufficient transportation

      2. Social Issues
         - Low public awareness
         - Improper waste segregation
         - Resistance to waste management facilities

      3. Environmental Impact
         - Groundwater contamination
         - Air pollution from burning waste
         - Soil degradation
         - Health hazards for nearby communities

      Success Stories:
      Despite these challenges, several Indian cities have made significant progress:
      
      1. Indore
         - First 'Clean City' in India
         - 100% door-to-door collection
         - Advanced waste processing
         
      2. Pune
         - Integrated waste pickers
         - Decentralized waste management
         - High recycling rates
    `,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41',
        caption: 'Urban waste management challenges'
      },
      {
        url: 'https://images.unsplash.com/photo-1526951521990-5d9339ad261d',
        caption: 'Impact of improper waste disposal'
      }
    ]
  },
  solutions: {
    title: 'Solutions and Best Practices',
    content: `
      Effective waste management requires a combination of technical solutions and behavioral changes. Here are key approaches that can make a significant difference:

      1. Waste Segregation
         - Separate organic waste
         - Identify recyclable materials
         - Special handling for hazardous waste
         - E-waste collection points

      2. Reduce and Reuse
         - Choose products with less packaging
         - Use reusable containers and bags
         - Repair items instead of replacing
         - Share or donate unused items

      3. Composting
         - Convert organic waste into fertilizer
         - Reduce landfill burden
         - Create valuable soil amendment
         - Lower greenhouse gas emissions

      4. Technology Integration
         - Smart bins for waste monitoring
         - Route optimization for collection
         - Automated sorting systems
         - Waste-to-energy conversion

      5. Community Engagement
         - Education programs
         - Clean-up drives
         - Recycling incentives
         - Awareness campaigns

      Innovative Solutions:
      1. Plastic Roads
         - Using plastic waste in road construction
         - Increased durability
         - Reduced environmental impact

      2. Waste-to-Energy
         - Converting organic waste to biogas
         - Generating electricity
         - Reducing landfill usage

      3. Smart Waste Management
         - IoT-enabled bins
         - Real-time monitoring
         - Optimized collection routes
    `,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
        caption: 'Modern recycling techniques'
      },
      {
        url: 'https://images.unsplash.com/photo-1528323273322-d81458248d40',
        caption: 'Community waste management initiatives'
      }
    ]
  },
  ewaste: {
    title: 'E-Waste Management',
    content: `
      Electronic waste (e-waste) is one of the fastest-growing waste streams globally. Proper management is crucial for environmental protection and resource recovery.

      Key Challenges:
      1. Rapid Technology Evolution
         - Shorter device lifecycles
         - Increasing consumption
         - Growing disposal volumes

      2. Hazardous Materials
         - Heavy metals
         - Toxic chemicals
         - Complex components

      3. Informal Recycling
         - Health risks
         - Environmental pollution
         - Resource loss

      Best Practices:
      1. Proper Collection
         - Designated e-waste centers
         - Producer take-back programs
         - Certified recyclers

      2. Safe Processing
         - Dismantling guidelines
         - Material recovery
         - Hazard containment

      3. Circular Economy
         - Design for recycling
         - Component reuse
         - Material recovery

      Success Metrics:
      - 50 million tonnes of e-waste generated globally
      - Only 20% properly recycled
      - Valuable materials worth $57 billion
    `,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
        caption: 'Electronic waste collection'
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
        caption: 'E-waste recycling facility'
      }
    ]
  }
};

const Education = () => {
  const [selectedArticle, setSelectedArticle] = React.useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Waste Management Education</h1>
        <p className="text-xl text-gray-600">Learn about sustainable waste management practices and their impact on our environment</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section 
          className="bg-white p-6 rounded-lg shadow cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-green-100"
          onClick={() => setSelectedArticle('wasteManagement')}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Recycle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Understanding Waste Management</h2>
              <p className="text-gray-600 mb-4">
                Learn about the fundamentals of waste management, including collection, transportation, and disposal of waste products.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
            alt="Waste Management"
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </section>

        <section 
          className="bg-white p-6 rounded-lg shadow cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-green-100"
          onClick={() => setSelectedArticle('wastecrisis')}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Factory className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">The Waste Crisis in India</h2>
              <p className="text-gray-600 mb-4">
                Understand the current waste management challenges facing India and their environmental impact.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1605600659908-0ef719419d41"
            alt="Waste Crisis"
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </section>

        <section 
          className="bg-white p-6 rounded-lg shadow cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-green-100"
          onClick={() => setSelectedArticle('solutions')}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Solutions and Best Practices</h2>
              <p className="text-gray-600 mb-4">
                Discover practical solutions and best practices for effective waste management.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
            alt="Solutions"
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </section>

        <section 
          className="bg-white p-6 rounded-lg shadow cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-green-100"
          onClick={() => setSelectedArticle('ewaste')}
        >
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Battery className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">E-Waste Management</h2>
              <p className="text-gray-600 mb-4">
                Learn about the challenges and solutions in managing electronic waste.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03"
            alt="E-Waste"
            className="w-full h-48 object-cover rounded-lg mt-4"
          />
        </section>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">{articles[selectedArticle].title}</h2>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="prose max-w-none">
                {articles[selectedArticle].content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 grid gap-8">
                {articles[selectedArticle].images.map((image, index) => (
                  <figure key={index} className="space-y-3">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full rounded-lg shadow-lg"
                    />
                    <figcaption className="text-center text-gray-600 italic">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;