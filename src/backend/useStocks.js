import { useState, useEffect } from 'react';

export const useStocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem('stocks'));
    if (storedStocks) {
      setStocks(storedStocks);
    }
  }, []);

  const handleBuy = (stock) => {
    setStocks((prevStocks) => {
      const updatedStocks = [...prevStocks, stock];
      localStorage.setItem('stocks', JSON.stringify(updatedStocks));
      return updatedStocks;
    });
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

      localStorage.setItem('stocks', JSON.stringify(updatedStocks));
      return updatedStocks;
    });
  };

  return { stocks, handleBuy, handleSell };
};