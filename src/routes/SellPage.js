import React, { useState } from 'react';
import '../styles/SellPage.css';

const SellPage = ({ stocks, onSell }) => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSell = (e) => {
    e.preventDefault();
    onSell(ticker, quantity);
  };

  return (
    <div>
      <h1>Sell Stocks</h1>
      <h2>Current Shares</h2>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Total Value ($)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>{stock.quantity}</td>
              <td>${stock.totalValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sell-form-container">
        <form onSubmit={handleSell}>
          <h3 htmlFor="ticker">Ticker:</h3>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <h3 htmlFor="quantity">Quantity:</h3>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button type="submit">Sell</button>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
