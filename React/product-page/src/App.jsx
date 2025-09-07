import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/home/home';
import Detail from './Pages/details/details';
import Navbar from './Pages/Navbar/navbar';
import Post from './Pages/Post/post';
import PostDetail from './Pages/PostDetail/postdetail';

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/details/:id" element={<Detail />}></Route>

        <Route path="/post" element={<Post />}></Route>
        <Route path="/postdetail/:postid" element={<PostDetail />}></Route>
      </Routes>
    </div>
  );
};
export default App;
