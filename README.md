# Exchange Rate Finder

This project is a web application that allows users to find the exchange rate between a country's currency and the Euro (EUR). The application is built with a React frontend and a Node.js/TypeScript backend.

## Features

*   Enter a country name to get the latest exchange rate.
*   Displays the country, currency code, and the exchange rate to EUR.
*   Loading and error states for a smooth user experience.

## Project Structure

The project is a monorepo with the following structure:

*   `/`: The root directory contains the backend Node.js/TypeScript application.
*   `/react-app`: This directory contains the frontend React application.

## Getting Started

### Prerequisites

*   Node.js and npm installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd exchage-rate
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd react-app
    npm install
    ```

### Running the Application

1.  **Start the backend server:**

    From the root directory, build the TypeScript code:

    ```bash
    npm run build
    ```

    *(Note: The backend currently does not have a start script. You would typically run the compiled JavaScript file, e.g., `node dist/index.js`)*

2.  **Start the frontend React application:**

    From the `react-app` directory:

    ```bash
    npm start
    ```

    This will open the application in your default browser at `http://localhost:3000`.

## Usage

1.  Open the application in your browser.
2.  Enter the name of a country in the input field.
3.  Click the "Get Exchange Rate" button.
4.  The application will display the exchange rate information for that country's currency to EUR.

## Running Tests

To run the tests for the React application, navigate to the `react-app` directory and run:

```bash
npm test
```
