import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
     console.log('newletter signup:', email);
    setEmail('');
   };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Shop Name</h3>
            <p className="text-gray-300">Your one-stop shop for all your need. Quality products, great price, and excellent customer service</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Products</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">About Us</a></li>
             </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">123 Bangalore, india</p>
            <p className="text-gray-300">Phone: 888888888</p>
            <p className="text-gray-300">Email: info@bangalore.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2043 Shop Name. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <motion.a href="#" whileHover={{ y: -2 }} className="text-gray-400 hover:text-white transition duration-300">
              <Facebook size={20} />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -2 }} className="text-gray-400 hover:text-white transition duration-300">
              <Twitter size={20} />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -2 }} className="text-gray-400 hover:text-white transition duration-300">
              <Instagram size={20} />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -2 }} className="text-gray-400 hover:text-white transition duration-300">
              <Mail size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;