import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, X } from 'lucide-react';

const CartPage = ({ cartItems, updateQuantity, removeFromCart }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const orderCheckout = () => {
    setShowConfirmation(true);
  };

  const OrderConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button 
              onClick={orderCheckout}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {/* order succusses popup */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white lg:p-8 p-4 rounded-lg shadow-lg max-w-md lg:w-full w-[90%]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl lg:text-2xl font-bold">Order Confirmation</h2>
                <button onClick={OrderConfirmation} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <p className="text-green-600 font-semibold mb-4">Your order has been successfully placed!</p>
              <div className="space-y-2 mb-4">
                <h3 className="font-semibold">Order Details:</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                       <span>{item.title} x {item.quantity}</span>
                     <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="text-xl font-bold mt-4 border-t pt-2">
                Total: ${totalPrice.toFixed(2)}
              </div>
              <button
                onClick={OrderConfirmation}
                className="mt-6 w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;