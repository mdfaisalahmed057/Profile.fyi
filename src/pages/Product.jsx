import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search } from 'lucide-react';

// Mock data for products (unchanged)
const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Electronics' },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Clothing' },
  { id: 3, name: 'Product 3', price: 39.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Home' },
  { id: 4, name: 'Product 4', price: 49.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Electronics' },
  { id: 5, name: 'Product 5', price: 59.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Clothing' },
  { id: 6, name: 'Product 6', price: 69.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Home' },
  { id: 7, name: 'Product 7', price: 79.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Electronics' },
  { id: 8, name: 'Product 8', price: 89.99, image: 'https://www.zzzone.co.uk/wp-content/uploads/2021/05/Creative-Product-Photography-2.jpg', category: 'Clothing' },
];

const ProductPage = () => {
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(100);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const applyFilters = () => {
    const filtered = products.filter(product => 
      (category === 'All' || product.category === category) &&
      product.price <= priceRange
    );
    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setCategory('All');
    setPriceRange(100);
    setFilteredProducts(products);
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen lg:text-lg-screen text-sm">
      {/* Navbar (unchanged) */}
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=" font-bold text-blue-600"
          >
            Logo
          </motion.div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
            >
              <ShoppingCart className="text-blue-600" size={20} />
            </motion.div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 text-xs lg:text-lg-screen bg-white p-4 rounded-lg shadow h-24 flex items-center justify-center">
          <div className="flex  flex-wrap items-center justify-center gap-2">
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-2 py-1 text-xs lg:text-lg-screen"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-32 h-2 mr-2 "
              />
              <span className="">Max: ${priceRange}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={applyFilters}
              className="bg-blue-500  h-6 text-white px-4 lg:h-8 rounded hover:bg-blue-600 transition duration-300"
            >
              Apply Filters
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="bg-gray-300 text-gray-700 px-4 h-6 lg:h-8 rounded hover:bg-gray-400 transition duration-300 "
            >
              Clear Filters
            </motion.button>
          </div>
        </div>

        {/* Product Grid (unchanged) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:text-lg-screen text-sm">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className=" font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500  text-white px-4 py-2  rounded hover:bg-blue-600 transition duration-300"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;