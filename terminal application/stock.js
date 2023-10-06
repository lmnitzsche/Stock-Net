const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.Y40TKJAMBDC4XBNR; //Y40TKJAMBDC4XBNR

const symbol = process.argv[2] || 'TSLA'; 

async function getStockPrice() {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`);

        //Extract the latest stock price
        const timeSeries = response.data['Time Series (1min)'];
        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestPrice = timeSeries[latestTimestamp]['1. open'];

        console.log(`Latest ${symbol} Price: $${latestPrice}`);

    } 
    catch(error) {
        console.error('Error fetching stock price:', error);
    }
}

getStockPrice();
