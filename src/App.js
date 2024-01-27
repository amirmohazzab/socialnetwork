import {Route, Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import HomeScreen from './pages/home/HomeScreen';
import AddCategory from './pages/category/AddCategory';
import EditCategory from './components/category/EditCategory';

function App() {
  return (
    <div className='wrapper'>  
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/add-category' element={<AddCategory />} />
        <Route path='/edit-category/:id' element={<EditCategory />} />
        
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
