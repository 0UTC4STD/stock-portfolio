import { useState } from 'react';

export const useStocks = () => {
  const [stocks, setStocks] = useState([]);

  const handleBuy = (stock) => {
    setStocks((prevStocks) => [...prevStocks, stock]);
  };

  const handleSell = (ticker, quantity) => {
    setStocks((prevStocks) => {
      let tickerExists = false;
  
      const updatedStocks = prevStocks.map((stock) => {
        if (stock.symbol === ticker) {
          tickerExists = true;
          if (stock.quantity === quantity) {
            stock.quantity = 0;
            stock.totalValue = 0;
          } else if (stock.quantity > quantity) {
            const pricePerShare = stock.totalValue / stock.quantity;
            stock.quantity -= quantity;
            stock.totalValue = stock.quantity * pricePerShare;
          } else {
            alert('You cannot sell more stocks than you own.');
            return stock;
          }
        }
        return stock;
      }).filter(stock => stock.quantity !== 0);
  
      if (!tickerExists) {
        alert('You do not own any stocks with this ticker.');
        return prevStocks;
      }
  
      return updatedStocks;
    });
  };

  return { stocks, handleBuy, handleSell };
};