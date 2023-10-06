document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'Y40TKJAMBDC4XBNR';
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const symbolInput = document.getElementById('symbolInput');
    const resultsContainer = document.getElementById('resultsContainer');

    async function getStockPrice(symbol) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`);
            const data = await response.json();
            const timeSeries = data['Time Series (1min)'];
            const latestTimestamp = Object.keys(timeSeries)[0];
            const latestPrice = parseFloat(timeSeries[latestTimestamp]['1. open']).toFixed(2);
            const resultText = document.createElement('p');

            resultText.textContent = `Latest ${symbol} Price: $${latestPrice}`;
            resultsContainer.appendChild(resultText);
        } 
        catch (error) {
            console.error('Error fetching stock price:', error);
            const errorText = document.createElement('p');
            errorText.textContent = 'Error fetching stock price.';
            resultsContainer.appendChild(errorText);
        }
    }

    searchButton.addEventListener('click', () => {
        const symbol = symbolInput.value.trim().toUpperCase();
        if (symbol) {
            getStockPrice(symbol);
        }
        else {
            alert('Please enter a valid stock symbol.');
        }
    });

    clearButton.addEventListener('click', () => {
        resultsContainer.innerHTML = '';
    });
});
