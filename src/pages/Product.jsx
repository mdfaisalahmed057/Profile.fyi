import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, ShoppingBag } from 'lucide-react';
import not_found from '../assets/not_found.gif';
 import CartPage from './Cart'; 

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
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [category, priceRange, searchTerm]);

  const applyFilters = () => {
    const filtered = products.filter(product => 
      (category === 'All' || product.category === category) &&
      product.price <= priceRange &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setCategory('All');
    setPriceRange(100);
    setSearchTerm('');
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 500);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <div className="font-sans min-h-screen lg:text-lg text-sm bg-gray-100">
       <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-blue-600 cursor-pointer"
            onClick={() => setShowCart(false)}
          >
            Logo
          </motion.div>
          <div className="flex items-center space-x-4">
            {!showCart && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            )}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={cartAnimation ? { scale: [1, 1.2, 1] } : {}}
              className="cursor-pointer relative"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="text-blue-600" size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </nav>
  
      <div className="container mx-auto px-8 py-8">
        {showCart ? (
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ) : (
          <>
            {/* Filters */}
            <div className="mb-8 text-xs lg:text-lg bg-white p-4 rounded-lg shadow">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded px-2 py-1 text-xs lg:text-lg"
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
                    className="w-32 h-2 mr-2"
                  />
                  <span>Max: ${priceRange}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyFilters}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Apply Filters
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                >
                  Clear Filters
                </motion.button>
              </div>
            </div>
  
             <AnimatePresence>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:text-lg text-sm">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="w-full h-48 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className={`w-full ${isInCart(product.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded transition duration-300 flex items-center justify-center`}
                        >
                          {isInCart(product.id) ? (
                            <>
                              <ShoppingCart className="mr-2" size={16} />
                              Go to Cart
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="mr-2" size={16} />
                              Add to Cart
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  <img src={not_found} alt="No products found" className="lg:w-64 lg:h-64 object-cover mb-4" />
                  <p className="text-xl font-semibold text-gray-600">No products found</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
  
};

export default ProductPage;