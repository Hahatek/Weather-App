import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import QuotesPage from './pages/QuotesPage/QuotesPage.jsx';
import AccountPage from './pages/AccountPage/AccountPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <ToastContainer />  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quotes" element={<QuotesPage />} />        
        <Route path="/accounts" element={<AccountPage />} />
        <Route path="/logins" element={<LoginPage />} />
        <Route path="/registers" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;