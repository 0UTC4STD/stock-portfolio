import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useStocks } from './backend/useStocks';
import './styles/App.css'
import {
  LoginPage,
  RegisterPage,
  HomePage,
  AboutPage,
  BuyPage,
  SellPage,
  ResearchPage,
  PortfolioPage,
  Navbar,
  Logout,
  ForgotPassword,
  // ProfilePage,
} from './routes.js';
import React, { useState, useEffect } from "react";

const MainLayout = ({ children, handleLogout }) => {
  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <main>{children}</main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { stocks, handleBuy, handleSell } = useStocks();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    window.addEventListener('beforeunload', handleLogout);

    return () => {
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, []);

  const handleLogout = (e) => {
    if (e && e.type === 'beforeunload') {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  return (
    <Router>
      {isAuthenticated ? (
        <MainLayout handleLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/buy" element={<BuyPage onBuy={handleBuy} />} />
            <Route path="/sell" element={<SellPage stocks={stocks} onSell={handleSell} />} />
            <Route path="/portfolio" element={<PortfolioPage stocks={stocks} key={stocks.length} />} />
            <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Routes>
        </MainLayout>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;