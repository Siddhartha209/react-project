import { useState } from "react";
import "./ShoppingApp.css";
import product1 from "../assets/img/product1.jpeg";
import product2 from "../assets/img/product2.jpg";
import product3 from "../assets/img/product3.jpeg";
import product4 from "../assets/img/product4.jpeg";

export default function ShoppingApp() {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, description: "High-quality sound with noise cancellation.", image: product1 },
    { id: 2, name: "Smart Watch", price: 149.99, description: "Track fitness, heart rate, and notifications.", image: product2 },
    { id: 3, name: "Gaming Mouse", price: 59.99, description: "RGB lighting with customizable buttons.", image: product3 },
    { id: 4, name: "4K Monitor", price: 299.99, description: "Crisp visuals with ultra-thin bezels.", image: product4 },
  ];

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product) => {
    setCart(prevCart => {
        const existing = prevCart.find(item => item.id === product.id);
        if (existing) {
        return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        } else {
        return [...prevCart, { ...product, quantity: 1 }];
        }
    });

    // Open the cart sidebar automatically
    setIsCartOpen(true);
    };


  const increaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Thank you for your purchase! Total: $${getTotal()}`);
    setCart([]);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero">
        <h2>Welcome to the Shop</h2>
        <p>Find the best gadgets at low prices!</p>
        <button className="cart-toggle" onClick={toggleCart}>
          Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </header>

      {/* Product Grid */}
      <main className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)} className="add-button">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={toggleCart}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <p className="cart-total">Total: ${getTotal()}</p>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
