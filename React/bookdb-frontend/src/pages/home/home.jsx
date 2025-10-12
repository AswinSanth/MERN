import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Container from '../../components/container/container';
import './home.css';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';

const Home = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/book');
      setBooks(response.data);
      console.log(response);
    } catch (e) {
      console.error('Error fetching books:', e);
    }
  };
  const Deleteitem = async id => {
    {
      try {
        await axios.delete(`http://localhost:8000/book/${id}`);
        getBooks();
      } catch (e) {
        console.error('Error fetching books:', e);
      }
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const navigate = useNavigate();

  return (
    <Container>
      <div className="homePage">
        {<Navbar />}
        <div className="box">
          <div className="headpage">
            <h1>Book Store</h1>
            <button className="add-Btn" onClick={()=>{
              navigate('/addBook')

            }}>Add Book</button>
          </div>
          <div className="bodypage">
            <div className="cards">
              {books.map(item => (
                <div className="book-card">
                  <h3>Book : {item.title}</h3>
                  <p>About: {item.description}</p>
                  <p>Author: {item.author}</p>
                  <p>Price: {item.price}</p>
                  <div className="card-actions">
                    <i class="fa-regular fa-pen-to-square" onClick={()=>{
                      navigate(`/editBook/${item._id}`)
                    }}></i>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => Deleteitem(item._id)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Home;
