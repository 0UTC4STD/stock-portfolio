import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from '../backend/ErrorMessage';

const ResearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStockData(searchTerm);
  };

  return (
    <div>
      <h1>Research</h1>
      <p>For Best Results it is recommended to use the stock ticker!</p>
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
          <p>Current Price: {stockData.price}</p>
          <p>Daily Highest Price: {stockData.high}</p>
          <p>Daily Lowest Price: {stockData.low}</p>
        </div>
      )}
    </div>
  );
};

export default ResearchPage;