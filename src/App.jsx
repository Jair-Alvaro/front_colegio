import Index from './pages/Index';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Colegio from './pages/colegios/Colegio';
import Zona from './pages/colegios/Zona';
import Prueba from './pages/colegios/Prueba';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/colegio" element={<Colegio />} />
        <Route path="/zona" element={<Zona />} />
        <Route path="/prueba" element={<Prueba />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;