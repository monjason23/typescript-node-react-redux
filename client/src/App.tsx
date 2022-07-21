import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import User from './pages/user/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/user' element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
