import React from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Edit, Send, Image } from 'lucide-react';

// Sample blog data
const sampleBlogs = [
  {
    id: 1,
    title: "The Future of Waste Management",
    content: "As we move towards a more sustainable future, innovative waste management solutions are becoming increasingly important. From smart bins to AI-powered sorting systems, technology is revolutionizing how we handle waste.\n\nOne of the most promising developments is the use of IoT sensors in waste containers, which can optimize collection routes and reduce operational costs. Additionally, new recycling technologies are making it possible to process previously difficult-to-recycle materials.",
    image_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    author: "Environmental Tech Team",
    created_at: "2025-03-20T10:00:00Z"
  },
  {
    id: 2,
    title: "Community-Led Recycling Initiatives",
    content: "Grassroots movements are leading the charge in transforming how communities approach recycling. Local initiatives are proving that small actions can have big impacts.\n\nFrom neighborhood composting programs to community recycling centers, these projects are not just reducing waste – they're building stronger, more environmentally conscious communities. Success stories from around the world show how citizen engagement is crucial for sustainable waste management.",
    image_url: "https://images.unsplash.com/photo-1618477462146-817c6a1f2161",
    author: "Community Action Network",
    created_at: "2025-03-18T14:30:00Z"
  },
  {
    id: 3,
    title: "The Zero-Waste Movement",
    content: "Zero-waste living is more than just a trend – it's a necessary shift in how we think about consumption and waste. This lifestyle change is gaining momentum globally as people realize the impact of their daily choices on the environment.\n\nPractical tips for reducing waste include using reusable containers, shopping at bulk stores, and composting organic waste. While achieving absolute zero waste might be challenging, every step towards reduction counts.",
    image_url: "https://images.unsplash.com/photo-1584711784829-78a4be7cd89c",
    author: "Sustainable Living Guide",
    created_at: "2025-03-15T09:15:00Z"
  }
];

const Blog = () => {
  const [blogs, setBlogs] = React.useState(() => {
    const savedBlogs = sessionStorage.getItem('userBlogs');
    return savedBlogs ? [...sampleBlogs, ...JSON.parse(savedBlogs)] : sampleBlogs;
  });
  
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isWriting, setIsWriting] = React.useState(false);
  const [newBlog, setNewBlog] = React.useState({
    title: '',
    content: '',
    image_url: ''
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const blogPost = {
      id: Date.now(),
      ...newBlog,
      author: 'Anonymous User',
      created_at: new Date().toISOString(),
      image_url: newBlog.image_url || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b'
    };

    const updatedBlogs = [...blogs, blogPost];
    setBlogs(updatedBlogs);

    // Save to session storage
    const userBlogs = JSON.parse(sessionStorage.getItem('userBlogs') || '[]');
    userBlogs.push(blogPost);
    sessionStorage.setItem('userBlogs', JSON.stringify(userBlogs));

    setNewBlog({ title: '', content: '', image_url: '' });
    setIsWriting(false);
    toast.success('Blog post created successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Environmental Blog</h1>
        <button
          onClick={() => setIsWriting(!isWriting)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center space-x-2"
        >
          <Edit className="h-5 w-5" />
          <span>{isWriting ? 'Cancel' : 'Write Blog'}</span>
        </button>
      </div>

      {isWriting ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  id="image_url"
                  value={newBlog.image_url}
                  onChange={(e) => setNewBlog({ ...newBlog, image_url: e.target.value })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="https://example.com/image.jpg"
                />
                <Image className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                rows={6}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Publish Blog</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-12">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={blogs[currentSlide].image_url}
                alt={blogs[currentSlide].title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{blogs[currentSlide].title}</h2>
                <p className="text-sm">
                  By {blogs[currentSlide].author} • {format(new Date(blogs[currentSlide].created_at), 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{blogs[currentSlide].content}</p>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {blogs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                By {blog.author} • {format(new Date(blog.created_at), 'MMM d, yyyy')}
              </p>
              <p className="text-gray-700 line-clamp-3">{blog.content}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;