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
import Profile from './pages/profile/Profile';
import UpdateProfile from './pages/profile/UpdateProfile';
import ProfileUser from './pages/profile/ProfileUser';
import Followers from './components/profile/Followers';
import Following from './components/profile/Following';


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

        <Route path='/profile' element={<Profile />} /> 
        <Route path='/profile/:id' element={<ProfileUser />} /> 
        <Route path='/user/update' element={<UpdateProfile />} /> 
        <Route path='/followers' element={<Followers />} /> 
        <Route path='/following' element={<Following />} /> 
        
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
