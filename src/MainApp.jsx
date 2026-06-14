import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import App from './App'; // هذا هو ملفك الذي يحتوي على كود المرضى

function MainApp() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* إذا كان مسجل دخول يذهب للمرضى، إذا لا يذهب للدخول */}
        <Route path="/" element={isLoggedIn ? <App /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default MainApp;