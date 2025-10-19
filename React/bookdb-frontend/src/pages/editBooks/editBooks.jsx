import './editBooks.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addBook, setAddBook] = useState({
    title: '',
    description: '',
    price: '',
    author: '',
  });
  const handlesubmit = async () => {
    if (id) {
      try {
        console.log(addBook);
        await axios.patch(`http://localhost:8000/book/${id}`, addBook);
        navigate('/Home');
      } catch (e) {
        console.error('Error fetching books:', e);
      }
    } else {
      try {
        console.log(addBook);
        const response = await axios.post(
          'http://localhost:8000/book',
          addBook
        );
        navigate('/Home');
      } catch (e) {
        console.error('Error fetching books:', e);
      }
    }
  };
  const getBooksById = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/book/${id}`);
      console.log(response.data);
      setAddBook(response.data);
    } catch (error) {
      console.error('Failed to fetch product', error);
    }
  };

  useEffect(() => {
    if (id) getBooksById();
  }, []);
  const onChange = e => {
    const { name, value } = e.target;
    setAddBook(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="edit">
      <h1>{!id ? 'AddBook ' : 'Edit Dook Details'}</h1>
      <div className="editinput">
        <label>Title</label>
        <input
          type="text"
          value={addBook.title}
          onChange={e => {
            onChange(e, 'title');
          }}
        />
      </div>
      <div className="editinput">
        <label>Author</label>
        <input
          type="text"
          value={addBook.author}
          onChange={e => {
            onChange(e, 'author');
          }}
        />
      </div>
      <div className="editinput">
        <label>Description</label>
        <input
          type="text"
          value={addBook.description}
          onChange={e => {
            onChange(e, 'description');
          }}
        />
      </div>
      <div className="editinput">
        <label>price</label>
        <input
          type="text"
          value={addBook.price}
          onChange={e => {
            onChange(e, 'price');
          }}
        />
      </div>
      <button className="addbtn" onClick={handlesubmit}>
        {id ? 'Update Book ' : 'Add Book'}
      </button>
    </div>
  );
};
export default EditBook;
