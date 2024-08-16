import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import not_found from '../assets/not_found.gif';
import CartPage from './Cart';
import data from '../data/data.json'
import Footer from './Footer';
import logo from '../assets/cloth_logo.png'
const products = data.productsData;
console.log(products);

const carouselImages = [
  "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/8/11/faa32f5c-6343-48fc-8d90-5e6118a0d0101723386388750-DESKTOP-MP-BANNER.jpg",
  "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/8/11/27a92274-f745-4fb4-9ce9-e1fe0367dc6d1723386388709-DESKTOP-WP-BANNER.jpg",
];

const ProductPage = () => {
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    applyFilters();
  }, [category, priceRange, searchTerm]);

  const applyFilters = () => {
    const filtered = products.filter(product =>
      (category === 'All' || product.category === category) &&
      product.price <= priceRange &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="font-sans min-h-screen lg:text-lg text-sm bg-gray-100">
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <nav className="sticky top-0 bg-white shadow-md z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-blue-600 cursor-pointer"
              onClick={() => setShowCart(false)}
            >
             <img src={logo} alt='logo' className='w-16 h-12 '/> 
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
      </nav>

      <div className="container mx-auto px-4 py-8">
        {showCart ? (
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ) : (
          <>
            {/* carousel section */}
            <div className="relative mb-8 mx-4">
              <motion.div
                className="overflow-hidden rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {carouselImages.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`Carousel image ${index + 1}`}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover flex-shrink-0"
                    />
                  ))}
                </motion.div>
              </motion.div>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>

            {/* filters section */}
            <div className="mb-8 text-xs lg:text-lg bg-white p-4 rounded-lg shadow">
              <div className=" text-xs lg:text-lg bg-white p-4 rounded-lg shadow">
                <div className="flex flex-wrap items-center justify-center gap-4">
                <div>
                  
                  <select
                     value={category.category}
                     onChange={(e) => setCategory(e.target.value)}
                     className="border rounded px-2 py-1 text-sm-screen  lg:text-lg-screen lg:text-lg" >
                     <option value="All ">All Categories</option>
                     {products.map((category)=>(
                      <option key={category.id} value={category.category}>{category.category}</option>
                   ))}
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
                    <span className='text-sm-screen  lg:text-lg-screen'>Max: ${priceRange}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyFilters}
                    className="bg-blue-500 text-white px-4 py-1 text-sm-screen lg:text-lg-screen rounded hover:bg-blue-600 transition duration-300"
                  >
                    Apply Filters
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="bg-gray-300 text-gray-700 text-sm-screen lg:text-lg-screen px-4 py-1 rounded hover:bg-gray-400 transition duration-300"
                  >
                    Clear Filters
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Product section */}
           
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
                        <img src={product.image} alt={product.title} className="w-full h-full object-contain " />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{product.title}</h3>
                        <div className="">
                        <span className="text-xs">{product.description}</span>
                        <p className="text-gray-600 ">${product.price.toFixed(2)}</p>

                         </div>
                        <motion.button
                          whileHover={{ scale: 0.98 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addToCart(product)}
                          className={`w-full ${isInCart(product.id) ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded transition duration-300 flex items-center justify-center  mt-2`}
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
      <Footer/>
    </div>
  );
};

export default ProductPage;