# MySQL Express Server with Token Authorization


This server is built using Express.js, MySQL, and CORS middleware for handling HTTP requests from the [React frontend](https://github.com/SatvikVejendla/SpotifyStats). It provides endpoints for token authorization, token insertion, and token retrieval.

---

## Installation

1. Clone the repository.
2. Install Node.js and npm if not already installed.
3. Run `npm install` to install dependencies.
4. Set up a MySQL database and configure the environment variables in a `.env` file:

    ```
    HOST=your_mysql_host
    USER=your_mysql_user
    PASSWORD=your_mysql_password
    DATABASE=your_mysql_database
    ```

5. Start the server by running `node index.js`.

---

## Endpoints

1. **POST /authorize:**

    - Inserts authorization details into the database.
    - Headers:
        - `code`: Authorization code
        - `token`: Access token
        - `refresh_token`: Refresh token
    - Response:
        - Status 201: Token inserted successfully
        - Status 409: Token already exists
        - Status 500: Error inserting token

2. **GET /display:**

    - Fetches all tokens from the database.
    - Response:
        - Status 200: JSON array of tokens
        - Status 500: Error fetching tokens

3. **POST /request:**

    - Retrieves token based on authorization code.
    - Headers:
        - `buffer`: Authorization code
    - Response:
        - Status 200: JSON object containing token
        - Status 500: Error fetching token

---

## Usage

- Use the provided endpoints to authorize, insert, and retrieve tokens.
- Ensure proper configuration of environment variables for MySQL connection.
- Handle errors appropriately in your client applications for different HTTP status codes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
