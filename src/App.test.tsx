import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test('renders the component', () => {
  render(<App />);
  expect(screen.getByText(/Exchange Rate Finder/i)).toBeInTheDocument();
});

test('allows the user to enter a country', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Enter a country name/i);
  fireEvent.change(input, { target: { value: 'Germany' } });
  expect(input).toHaveValue('Germany');
});

test('fetches and displays the exchange rate for a valid country', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Enter a country name/i);
  const button = screen.getByText(/Get Exchange Rate/i);

  fireEvent.change(input, { target: { value: 'Germany' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Exchange Rate/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/"country": "Germany"/i)).toBeInTheDocument();
  expect(screen.getByText(/"currency": "EUR"/i)).toBeInTheDocument();
  expect(screen.getByText(/"rate": 1/i)).toBeInTheDocument();
});

test('displays an error message for an invalid country', async () => {
  server.use(
    http.get('https://restcountries.com/v3.1/name/:country', () => {
      return new HttpResponse('Not Found', { status: 404 });
    })
  );

  render(<App />);
  const input = screen.getByPlaceholderText(/Enter a country name/i);
  const button = screen.getByText(/Get Exchange Rate/i);

  fireEvent.change(input, { target: { value: 'InvalidCountry' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Could not fetch country data. Status: 404/i)).toBeInTheDocument();
  });
});

test('displays loading state correctly', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Enter a country name/i);
  const button = screen.getByText(/Get Exchange Rate/i);

  fireEvent.change(input, { target: { value: 'Germany' } });
  fireEvent.click(button);

  expect(button).toBeDisabled();
  expect(button).toHaveTextContent('Loading...');

  await waitFor(() => {
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Get Exchange Rate');
  });
});

test('displays an error message for an invalid exchange rate API response', async () => {
  server.use(
    http.get('https://api.exchangerate-api.com/v4/latest/:currency', () => {
      return new HttpResponse('Not Found', { status: 404 });
    })
  );

  render(<App />);
  const input = screen.getByPlaceholderText(/Enter a country name/i);
  const button = screen.getByText(/Get Exchange Rate/i);

  fireEvent.change(input, { target: { value: 'Germany' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Could not fetch exchange rate data. Status: 404/i)).toBeInTheDocument();
  });
});

test('does not submit when the input is empty', () => {
  const mockFetch = jest.spyOn(global, 'fetch');
  render(<App />);
  const button = screen.getByText(/Get Exchange Rate/i);

  fireEvent.click(button);

  expect(mockFetch).not.toHaveBeenCalled();
});
