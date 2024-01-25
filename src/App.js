import {Route, Routes} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import HomeScreen from './pages/home/HomeScreen';

function App() {
  return (
    <div className='wrapper'>  
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
