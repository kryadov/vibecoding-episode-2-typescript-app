# Exchange Rate Finder

This project is a web application that allows users to find the exchange rate between a country's currency and the Euro (EUR). The application is built with React and TypeScript.

## Features

*   Enter a country name to get the latest exchange rate.
*   Displays the country, currency code, and the exchange rate to EUR.
*   Loading and error states for a smooth user experience.

## Project Structure

This repository is the React frontend: a single-page app built with [Vite](https://vite.dev/) and TypeScript.
It calls the public restcountries.com and exchangerate-api.com APIs directly from the browser; there is no backend
in this repository.

*   `index.html`: the page Vite serves and builds from (it loads `src/index.tsx`).
*   `src/`: the application and its tests; `src/mocks/` holds the [MSW](https://mswjs.io/) handlers the tests use.
*   `public/`: static files copied verbatim into the build.

## Getting Started

### Prerequisites

*   Node.js 22.12 or newer (Vite 8 requires it) and npm.

### Installation

```bash
git clone <repository-url>
cd vibecoding-episode-2-typescript-app
npm ci
```

### Running the Application

```bash
npm start          # Vite dev server at http://localhost:3000
npm run build      # type-check (tsc --noEmit), then a production build into build/
npm run preview    # serve the production build locally
```

Environment variables exposed to the app must be prefixed `VITE_` and are read through `import.meta.env.VITE_*`
(create-react-app used `REACT_APP_*` and `process.env`; the app currently uses none).

## Usage

1.  Open the application in your browser.
2.  Enter the name of a country in the input field.
3.  Click the "Get Exchange Rate" button.
4.  The application will display the exchange rate information for that country's currency to EUR.

## Running Tests

The tests run on [Vitest](https://vitest.dev/) with jsdom and React Testing Library:

```bash
npm test
```
