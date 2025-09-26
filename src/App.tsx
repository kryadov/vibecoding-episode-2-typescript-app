import React, { useState } from 'react';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [exchangeRate, setExchangeRate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setExchangeRate(null);

    try {
      // First, get the currency code for the country
      const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      if (!countryResponse.ok) {
        throw new Error(`Could not fetch country data. Status: ${countryResponse.status}`);
      }
      const countryData = await countryResponse.json();
      const currencyCode = Object.keys(countryData[0].currencies)[0];

      // Then, get the exchange rate for that currency to EUR
      const exchangeResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`);
      if (!exchangeResponse.ok) {
        throw new Error(`Could not fetch exchange rate data. Status: ${exchangeResponse.status}`);
      }
      const exchangeData = await exchangeResponse.json();

      if (exchangeData.rates && exchangeData.rates.EUR) {
        setExchangeRate({
          country: countryData[0].name.common,
          currency: currencyCode,
          rate: exchangeData.rates.EUR,
        });
      } else {
        throw new Error('EUR exchange rate not found for the specified currency.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exchange Rate Finder</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter a country name"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Exchange Rate'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {exchangeRate && (
          <div className="result">
            <h2>Exchange Rate</h2>
            <pre>{JSON.stringify(exchangeRate, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;