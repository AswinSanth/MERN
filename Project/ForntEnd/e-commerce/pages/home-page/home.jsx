import { useState, useEffect } from 'react';
import HomeNavbar from '../../components/home-nav/home-nav';
import axios from 'axios';

import './home.css';

import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const getProducts = async (filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8000/product', {
        params: filters,
      });
      setProduct(response.data);
    } catch (e) {
      console.error('Error fetching products', e);
    }
  };
  const addToCart = async productId => {
    try {
      console.log(userId);
      const response = await axios.post('http://localhost:8000/cart/add', {
        userId,
        productId,
        quantity: 1,
      });
      alert('Product added to cart');
    } catch (e) {
      console.log(e);
      alert('Failed to add to cart');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const handleSearch = () => {
    getProducts({ title: search });
  };
  const onCategory = cat => {
    setCategory(cat);
    if (cat == 'All Product') {
      getProducts();
    } else {
      getProducts({ category: cat });
    }
  };
  const handleSort = async sortype => {
    getProducts({ sort: sortype });
  };
  

  const catArr = ['All Product', 'Music', 'Home', 'Phone'];
  return (
    <div className="main-home">
      <HomeNavbar />

      <div className="top-side-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>Shop</h1>
          <p>Give All You Need</p>
          <div className="hero-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search on Stuffsus"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="bottom-side-content">
        <div className="sidebar">
          <h3>Category</h3>
          <ul>
            {catArr.map(catItems => (
              <li
                className={category === catItems ? 'active' : ''}
                onClick={() => onCategory(catItems)}
              >
                <a>{catItems}</a>
              </li>
            ))}
          </ul>
          <h3>Filters</h3>
          <ul>
            <li onClick={() => handleSort('lowToHigh')}>
              <a>Price: Low to High</a>
            </li>
            <li onClick={() => handleSort('highToLow')}>
              <a>Price: High to Low</a>
            </li>
          </ul>
        </div>

        <div className="product-content">
          <div className="cards">
            {product.map(item => (
              <div
                className="product-card"
                onClick={() => {
                  navigate(`/Product/${item._id}`);
                }}
                key={item._id || item.id}
              >
                <span className="card-category">{item.category}</span>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>

                <div className="card-rating">
                  <span>⭐ {item.rating || 5.0}</span>
                  <span>({item.reviews || 0} Reviews)</span>
                </div>

                <p className="card-price">${item.price}</p>

                <div className="card-buttons">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      addToCart(item._id);
                    }}
                    className="add-cart-btn"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="buy-now-btn"
                    
                 
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
