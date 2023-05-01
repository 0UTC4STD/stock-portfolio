import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from '../backend/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const BuyPage = ({ onBuy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockData, setStockData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStockData = async (ticker) => {
    try {
      const quoteResponse = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=701XT7HF8HCGIAJ5`);
      const searchResponse = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=701XT7HF8HCGIAJ5`);

      const quoteData = quoteResponse.data['Global Quote'];
      const searchData = searchResponse.data.bestMatches && searchResponse.data.bestMatches[0];

      if (quoteData && searchData) {
        setError(null);
        setStockData({
          symbol: searchData['1. symbol'],
          name: searchData['2. name'],
          price: parseFloat(quoteData['05. price']),
        });
      } else {
        setError('No stock ticker or company name found.');
        setStockData(null);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('An error occurred while fetching stock data.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStockData(searchTerm);
  };

  const handleBuy = () => {
    onBuy({ ...stockData, quantity, totalValue: stockData.price * quantity });
    navigate('/portfolio');
  };

  return (
    <div>
      <h1>Buy</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter stock ticker or company name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <ErrorMessage message={error} />}
      {stockData && (
        <div>
          <h2>Stock Information</h2>
          <p>Company Name: {stockData.name}</p>
          <p>Stock Ticker: {stockData.symbol}</p>
          <p>Current Price: {stockData.price.toFixed(2)}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            step="1"
          />
          <button onClick={handleBuy}>Buy</button>
        </div>
      )}
    </div>
  );
};

export default BuyPage;