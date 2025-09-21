import { useState } from "react";
import "./ShoppingApp.css";

export default function ShoppingApp() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99.99",
      description: "High-quality sound with noise cancellation.",
      image: "/images/product1.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$149.99",
      description: "Track fitness, heart rate, and notifications.",
      image: "/images/product2.jpg",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: "$59.99",
      description: "RGB lighting with customizable buttons.",
      image: "/images/product3.jpg",
    },
    {
      id: 4,
      name: "4K Monitor",
      price: "$299.99",
      description: "Crisp visuals with ultra-thin bezels.",
      image: "/images/product4.jpg",
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero">
        <h2>Welcome to ShopEase</h2>
        <p>Find the best gadgets at unbeatable prices!</p>
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
    </div>
  );
}
