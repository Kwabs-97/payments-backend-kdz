# Subscriptions Project

This project manages subscription plans, processes data, and generates CSV reports. It includes a MongoDB connection, subscription filtering, and unit tests.

## Features
- Connects to a MongoDB database.
- Filters subscriptions with a plan price greater than or equal to 50.
- Generates a CSV file with subscription details.
- Unit tests using Jest.
- Babel for ES6+ support.

## File Structure

- `app.js`: Main application logic for fetching subscriptions, filtering, and generating CSV files.
- `babel.config.js`: Babel configuration for transpiling ES6+ code.
- `jest.config.js`: Jest configuration for testing.
- `model/`: Contains subscription-related logic (e.g., `getSubs`).
- `config/mongoose.js`: MongoDB connection logic (not provided but referenced in `app.js`).

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd subscriptions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB:
   - Ensure you have a MongoDB instance running.
   - Update the MongoDB connection string in `config/mongoose.js`.
   
*** Read comments in app.js to get started**
4. Run the application:
   ```bash
   node app.js
   ```

5. Run tests:
   ```bash
   npm test
   ```

## Configuration

- **Babel**: Configured in `babel.config.js` to use `@babel/preset-env`.
- **Jest**: Configured in `jest.config.js` for testing with Babel support.

## Insights

- The application processes MongoDB `ObjectId` fields and converts them to JSON-compatible strings for APIs or CSV generation.
- The `.lean()` method is recommended for efficient MongoDB queries.

## License

This project is licensed under [Your License].