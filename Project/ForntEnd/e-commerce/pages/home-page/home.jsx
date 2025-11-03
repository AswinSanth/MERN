
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
    console.log(userId, productId);
    try {
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
    if (cat === 'All Product') {
      getProducts();
    } else {
      getProducts({ category: cat });
    }
  };

  const handleSort = async sortype => {
    getProducts({ sort: sortype });
  };

  const categories = ['All Product', 'Music', 'Home', 'Phone'];

  return (
    <div className="home">
      <HomeNavbar />

      
      <div className="home__hero">
        <div className="home__hero-bg"></div>
        <div className="home__hero-content">
          <h1>Shop</h1>
          <p>Give All You Need</p>
          <div className="home__search-bar">
            <FaSearch className="home__search-icon" />
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

     
      <div className="home__content">
    
        <aside className="home__sidebar">
          <h3>Category</h3>
          <ul>
            {categories.map(cat => (
              <li
                key={cat}
                className={`home__sidebar-item ${
                  category === cat ? 'home__sidebar-item--active' : ''
                }`}
                onClick={() => onCategory(cat)}
              >
                <a>{cat}</a>
              </li>
            ))}
          </ul>

          <h3>Filters</h3>
          <ul>
            <li
              className="home__sidebar-item"
              onClick={() => handleSort('lowToHigh')}
            >
              <a>Price: Low to High</a>
            </li>
            <li
              className="home__sidebar-item"
              onClick={() => handleSort('highToLow')}
            >
              <a>Price: High to Low</a>
            </li>
          </ul>
        </aside>

     
        <div className="home__products">
          <div className="home__product-grid">
            {product.map(item => (
              <div
                className="home__product-card"
                onClick={() => navigate(`/Product/${item._id}`)}
                key={item._id || item.id}
              >
                <span className="home__product-category">{item.category}</span>
                <img
                  className="home__product-image"
                  src={item.image}
                  alt={item.title}
                />
                <h4 className="home__product-title">{item.title}</h4>

                <div className="home__product-rating">
                  <span>⭐ {item.rating || 5.0}</span>
                  <span>({item.reviews || 0} Reviews)</span>
                </div>

                <p className="home__product-price">${item.price}</p>

                <div className="home__product-actions">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      console.log(item._id)
                      addToCart(item._id);
                    }}
                    className="home__btn home__btn--cart"
                  >
                    Add to Cart
                  </button>
                  <button className="home__btn home__btn--buy">Buy Now</button>
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
