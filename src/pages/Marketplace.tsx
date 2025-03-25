import React from 'react';
import { ShoppingCart, Filter, Search, Star, Package, Leaf, SlidersHorizontal, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'All Products',
    subcategories: []
  },
  {
    name: 'Home & Living',
    subcategories: ['Kitchen', 'Decor', 'Furniture', 'Storage']
  },
  {
    name: 'Fashion',
    subcategories: ['Accessories', 'Clothing', 'Bags', 'Jewelry']
  },
  {
    name: 'Garden',
    subcategories: ['Plants', 'Tools', 'Composting', 'Outdoor']
  },
  {
    name: 'Stationery',
    subcategories: ['Notebooks', 'Writing', 'Organization', 'Art Supplies']
  },
  {
    name: 'Art & Decor',
    subcategories: ['Wall Art', 'Sculptures', 'Handmade', 'Vintage']
  }
];

const priceRanges = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 to $50' },
  { min: 50, max: 100, label: '$50 to $100' },
  { min: 100, max: Infinity, label: 'Over $100' }
];

const ratings = [5, 4, 3, 2, 1];

const sampleProducts = [
  {
    id: 1,
    name: 'Recycled Paper Notebook',
    description: 'Handcrafted notebook made from 100% recycled paper with eco-friendly binding',
    price: 12.99,
    category: 'Stationery',
    subcategory: 'Notebooks',
    image_url: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c',
    stock: 50,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Upcycled Glass Vase',
    description: 'Beautiful vase crafted from recycled glass bottles with unique patterns',
    price: 29.99,
    category: 'Home & Living',
    subcategory: 'Decor',
    image_url: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9',
    stock: 30,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: 'Eco-Friendly Tote Bag',
    description: 'Durable tote bag made from recycled plastic bottles',
    price: 19.99,
    category: 'Fashion',
    subcategory: 'Bags',
    image_url: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907',
    stock: 100,
    rating: 4.6,
    reviews: 256
  },
  {
    id: 4,
    name: 'Recycled Metal Wall Art',
    description: 'Unique wall decoration made from reclaimed metal pieces',
    price: 89.99,
    category: 'Art & Decor',
    subcategory: 'Wall Art',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38',
    stock: 15,
    rating: 4.9,
    reviews: 45
  },
  {
    id: 5,
    name: 'Composting Starter Kit',
    description: 'Complete kit for starting your home composting journey',
    price: 49.99,
    category: 'Garden',
    subcategory: 'Composting',
    image_url: 'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f',
    stock: 40,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 6,
    name: 'Recycled Wooden Planter',
    description: 'Handcrafted planter box made from reclaimed wood',
    price: 34.99,
    category: 'Garden',
    subcategory: 'Plants',
    image_url: 'https://images.unsplash.com/photo-1459156212016-c812468e2115',
    stock: 25,
    rating: 4.4,
    reviews: 78
  },
  {
    id: 7,
    name: 'Upcycled Denim Jacket',
    description: 'One-of-a-kind jacket made from recycled denim',
    price: 79.99,
    category: 'Fashion',
    subcategory: 'Clothing',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    stock: 20,
    rating: 4.8,
    reviews: 92
  },
  {
    id: 8,
    name: 'Recycled Glass Coasters',
    description: 'Set of 4 unique coasters made from recycled glass',
    price: 24.99,
    category: 'Home & Living',
    subcategory: 'Kitchen',
    image_url: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb',
    stock: 60,
    rating: 4.6,
    reviews: 167
  }
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState(sampleProducts);
  const [cart, setCart] = React.useState([]);
  const [shippingAddress, setShippingAddress] = React.useState('');
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('All Products');
  const [selectedSubcategory, setSelectedSubcategory] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('featured');
  const [showFilters, setShowFilters] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: Infinity });
  const [minRating, setMinRating] = React.useState(0);
  const [inStock, setInStock] = React.useState(false);

  const filteredProducts = React.useMemo(() => {
    return products
      .filter(product => 
        // Category filter
        (selectedCategory === 'All Products' || product.category === selectedCategory) &&
        // Subcategory filter
        (!selectedSubcategory || product.subcategory === selectedSubcategory) &&
        // Search query
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        // Price range
        product.price >= priceRange.min && product.price <= priceRange.max &&
        // Rating filter
        product.rating >= minRating &&
        // Stock filter
        (!inStock || product.stock > 0)
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'reviews':
            return b.reviews - a.reviews;
          default:
            return 0;
        }
      });
  }, [products, selectedCategory, selectedSubcategory, searchQuery, sortBy, priceRange, minRating, inStock]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success('Added to cart');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Removed from cart');
  };

  const handleCheckout = () => {
    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

    setIsCheckingOut(true);
    
    setTimeout(() => {
      setCart([]);
      setShippingAddress('');
      setIsCheckingOut(false);
      document.getElementById('checkout-modal').close();
      toast.success('Order placed successfully!');
      navigate('/marketplace');
    }, 1000);
  };

  const clearFilters = () => {
    setSelectedCategory('All Products');
    setSelectedSubcategory('');
    setPriceRange({ min: 0, max: Infinity });
    setMinRating(0);
    setInStock(false);
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Recycled Products Marketplace</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => document.getElementById('checkout-modal').showModal()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center space-x-2"
            >
              <Package className="h-5 w-5" />
              <span>Checkout (${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)})</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-green-600 hover:text-green-700"
              >
                Clear all
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setSelectedSubcategory('');
                      }}
                      className={`text-sm w-full text-left ${
                        selectedCategory === category.name
                          ? 'text-green-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {category.name}
                    </button>
                    {selectedCategory === category.name && category.subcategories.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {category.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubcategory(sub)}
                            className={`text-sm w-full text-left ${
                              selectedSubcategory === sub
                                ? 'text-green-600 font-medium'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Ranges */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange({ min: range.min, max: range.max })}
                    className={`text-sm w-full text-left ${
                      priceRange.min === range.min && priceRange.max === range.max
                        ? 'text-green-600 font-medium'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Customer Rating</h3>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`text-sm w-full text-left flex items-center ${
                      minRating === rating ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                    <span className="ml-2">& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-medium mb-2">Availability</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'All Products' || selectedSubcategory || priceRange.max !== Infinity || minRating > 0 || inStock) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== 'All Products' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {selectedCategory}
                  <button
                    onClick={() => {
                      setSelectedCategory('All Products');
                      setSelectedSubcategory('');
                    }}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {selectedSubcategory && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {selectedSubcategory}
                  <button
                    onClick={() => setSelectedSubcategory('')}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {priceRange.max !== Infinity && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  ${priceRange.min} - ${priceRange.max}
                  <button
                    onClick={() => setPriceRange({ min: 0, max: Infinity })}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  {minRating}+ Stars
                  <button
                    onClick={() => setMinRating(0)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {inStock && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  In Stock Only
                  <button
                    onClick={() => setInStock(false)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
                  />
                  {product.stock < 20 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Low Stock
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <div className="text-sm text-gray-500">{product.category} › {product.subcategory}</div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">${product.price}</span>
                      <span className="ml-2 text-sm text-gray-500">{product.stock} left</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-green-600 hover:text-green-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <dialog id="checkout-modal" className="modal p-6 rounded-lg shadow-xl bg-white max-w-md w-full">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Cart Summary</h3>
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span>{item.name}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500 text-sm hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-bold">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="shipping-address" className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <textarea
              id="shipping-address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => document.getElementById('checkout-modal').close()}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 flex items-center space-x-2"
            >
              {isCheckingOut ? (
                <>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Package className="h-5 w-5" />
                  <span>Place Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Marketplace;