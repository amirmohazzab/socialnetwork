import {Route, Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import HomeScreen from './pages/home/HomeScreen';
import AddCategory from './pages/category/AddCategory';
import EditCategory from './components/category/EditCategory';
import AddPost from './pages/post/AddPost';
import DetailPost from './pages/post/DetailPost';
import EditPost from './pages/post/EditPost';


function App() {
  return (
    <div className='wrapper'>  
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/add-category' element={<AddCategory />} />
        <Route path='/edit-category/:id' element={<EditCategory />} />

        <Route path='/add-post' element={<AddPost />} />
        <Route path='/detail-post/:id' element={<DetailPost />} />
        <Route path='/edit-post/:id' element={<EditPost />} /> 
        
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
