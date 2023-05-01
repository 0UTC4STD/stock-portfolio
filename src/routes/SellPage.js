import React, { useState } from 'react';

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
      <h2>Current Portfolio</h2>
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
      <form onSubmit={handleSell}>
        <label htmlFor="ticker">Ticker:</label>
        <input
          type="text"
          id="ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <label htmlFor="quantity">Quantity:</label>
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
  );
};

export default SellPage;