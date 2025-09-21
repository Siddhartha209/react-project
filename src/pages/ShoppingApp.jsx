import { useState } from "react";
import "./ShoppingApp.css";
import product1 from "./assets/img/product1.jpeg";
import product2 from "./assets/img/product2.jpg";
import product3 from "./assets/img/product3.jpeg";
import product4 from "./assets/img/product4.jpeg";

export default function ShoppingApp() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99.99",
      description: "High-quality sound with noise cancellation.",
      image: product1,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$149.99",
      description: "Track fitness, heart rate, and notifications.",
      image: product2,
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: "$59.99",
      description: "RGB lighting with customizable buttons.",
      image: product3,
    },
    {
      id: 4,
      name: "4K Monitor",
      price: "$299.99",
      description: "Crisp visuals with ultra-thin bezels.",
      image: product4,
    },
  ];

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotal = () => {
    return cart
      .reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0)
      .toFixed(2);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero">
        <h2>Welcome to ShopEase</h2>
        <p>Find the best gadgets at unbeatable prices!</p>
        <button className="cart-toggle" onClick={toggleCart}>
          Cart ({cart.length})
        </button>
      </header>

      {/* Product Grid */}
      <main className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">{product.price}</p>
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
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <p className="cart-total">Total: ${getTotal()}</p>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
