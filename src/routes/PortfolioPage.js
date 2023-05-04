import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PortfolioPage.css';

const PortfolioPage = ({ stocks }) => {
  const [stocksWithMarketValue, setStocksWithMarketValue] = useState([]);
  const [totalValues, setTotalValues] = useState({ parValue: 0, marketValue: 0, gainLoss: 0 });

  useEffect(() => {
    fetchMarketValues();
  }, [stocks]);

  const fetchMarketValues = async () => {
    const updatedStocks = [];
    let totalParValue = 0;
    let totalMarketValue = 0;
    let totalGainLoss = 0;

    for (const stock of stocks) {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=701XT7HF8HCGIAJ5`
        );
        if (!response.data || !response.data['Global Quote']) {
          console.error(`No data found for symbol ${stock.symbol}`);
          continue;
        }
        const currentPrice = parseFloat(response.data['Global Quote']['05. price']);
        const marketValue = currentPrice * stock.quantity;
        const gainLoss = marketValue - stock.totalValue;

        totalParValue += stock.totalValue;
        totalMarketValue += marketValue;
        totalGainLoss += gainLoss;

        updatedStocks.push({ ...stock, currentPrice, marketValue, gainLoss });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    }

    const updatedStocksWithPercentages = updatedStocks.map((stock) => ({
      ...stock,
      percentage: (stock.marketValue / totalMarketValue) * 100,
    }));

    setStocksWithMarketValue(updatedStocksWithPercentages);
    setTotalValues({ parValue: totalParValue, marketValue: totalMarketValue, gainLoss: totalGainLoss });
  };


  return (
    <div>
      <h1>Portfolio</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Par Value</th>
            <th>Current Price</th>
            <th>Market Value</th>
            <th>Gain/Loss</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {stocksWithMarketValue.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>{stock.quantity}</td>
              <td>${stock.totalValue.toFixed(2)}</td>
              <td>${stock.currentPrice.toFixed(2)}</td>
              <td>${stock.marketValue.toFixed(2)}</td>
              <td style={{ color: stock.gainLoss >= 0 ? 'green' : 'red' }}>
                {stock.gainLoss >= 0 ? '+' : '-'}${Math.abs(stock.gainLoss).toFixed(2)}
              </td>
              <td>{stock.percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td style={{ borderTop: '2px solid black' }}>Total</td>
            <td style={{ borderTop: '2px solid black' }}></td>
            <td style={{ borderTop: '2px solid black' }}></td>
            <td style={{ borderTop: '2px solid black' }}>${totalValues.parValue.toFixed(2)}</td>
            <td style={{ borderTop: '2px solid black' }}></td>
            <td style={{ borderTop: '2px solid black' }}>${totalValues.marketValue.toFixed(2)}</td>
            <td style={{ borderTop: '2px solid black', color: totalValues.gainLoss >= 0 ? 'green' : 'red' }}>
              {totalValues.gainLoss >= 0 ? '+' : '-'}${Math.abs(totalValues.gainLoss).toFixed(2)}
            </td>
            <td style={{ borderTop: '2px solid black' }}>100%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PortfolioPage;
