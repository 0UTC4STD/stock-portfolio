import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from '../backend/ErrorMessage';
import '../styles/ResearchPage.css';

const ResearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [profitLoss, setProfitLoss] = useState(null);

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
          price: quoteData['05. price'],
          high: quoteData['03. high'],
          low: quoteData['04. low'],
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
  
  const calculateProfitLoss = (e) => {
    e.preventDefault();
    if (qty && sellPrice && stockData) {
      const currentPrice = parseFloat(stockData.price);
      const result = (parseFloat(sellPrice) * parseFloat(qty)) - (currentPrice * parseFloat(qty));
      setProfitLoss(result);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchStockData(searchTerm);
  };

  return (
  <div>
    <form className="search-form" onSubmit={handleSearch}>
      <div>
        <h1>Research</h1>
        <p>For Best Results it is recommended to use the stock ticker!</p>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter stock ticker or company name"
      />
      <button className="search-button" type="submit">Search</button>
    </form>
    {error && <ErrorMessage message={error} />}
    <div className="boxes-container">
      {stockData && (
        <div className="stock-info-container">
          <h2>Stock Information</h2>
          <p>Company Name: {stockData.name}</p>
          <p>Stock Ticker: {stockData.symbol}</p>
          <p>Current Price: {stockData.price}</p>
          <p>Daily Highest Price: {stockData.high}</p>
          <p>Daily Lowest Price: {stockData.low}</p>
        </div>
      )}
      {stockData && (
        <div className="profit-prediction-container">
          <h2>Profit Prediction</h2>
          <form onSubmit={calculateProfitLoss}>
            <label htmlFor="qty">Qty of shares:</label>
            <input
              type="number"
              id="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              min="1"
            />
            <label htmlFor="sell-price">Sell Price:</label>
            <input
              type="number"
              id="sell-price"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              min="0"
              step="0.01"
            />
            <button className="calculate-button" type="submit">
              Calculate
            </button>
          </form>
          {profitLoss !== null && (
            <div>
              {profitLoss > 0 ? (
                <p className="profit">Profit: ${profitLoss.toFixed(2)}</p>
              ) : (
                <p className="loss">Loss: ${Math.abs(profitLoss).toFixed(2)}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
};

export default ResearchPage;
