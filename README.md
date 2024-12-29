# CampQuest
CampQuest is a web application where users can create and review campgrounds. It is built using Node.js, Express, MongoDB, and Bootstrap.

## Features

- User authentication with Passport.js
- Authorization for campground ownership
- CRUD operations for campgrounds and reviews
- Responsive design with Bootstrap
- Flash messages for user feedback

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/CampQuest.git
    ```
2. Install dependencies:
    ```bash
    cd CampQuest
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add the following variables:
        ```
        DATABASEURL=<your-mongodb-url>
        SECRET=<your-secret-key>
        ```

4. Run the application:
    ```bash
    node app.js
    ```

## Usage

- Visit `http://localhost:3000` in your browser to access the application.
- Sign up for an account to create and review campgrounds.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Passport.js](http://www.passportjs.org/)


