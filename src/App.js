import {Route, Routes} from 'react-router-dom'
import Register from './pages/auth/Register';

function App() {
  return (
    <div className='wrapper'>  
      <Routes>
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
