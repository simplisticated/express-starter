# express-starter

This is a starter template for a Node.js backend project that includes the following features and tools:

* Express framework
* TypeScript
* Jest
* Prettier
* ESLint with rules from Airbnb
* [Formidable](https://github.com/node-formidable/formidable)
* GZIP compression
* Implementation of the best [security practices](https://expressjs.com/en/advanced/best-practice-security.html) recommended by Express framework maintainers

## Table of Contents
* [How to Get Started](#how-to-get-started)
* [Environment Variables](#environment-variables)
* [Contributing](#contributing)
* [License](#license)

## How to Get Started

To begin, open your terminal and run the following command to install the required dependencies:

```
npm install
```

For starting the server in development mode, use the following command:

```
npm run start:dev
```

To run the server in production mode, follow these steps:

```
npm run build
npm run start
```

## Environment Variables

This project relies on various environment variables for configuration. You can set these variables either in a local `.env` file or through your hosting environment, depending on your deployment method.

Here are the essential environment variables and their purposes:

* `PORT`: Specifies the port on which the server will listen. If not provided, the default port is 3000.
* `LOG_REQUESTS`: Controls whether request logging is enabled. When set to `true`, the application logs requests, including the date, HTTP method, URL, and request body.

You should create a `.env` file in the root of your project and define these variables with their respective values.

Here is an example `.env` file:

```
PORT=3000
LOG_REQUESTS=true
```

## Contributing

Your input is welcome! If you have any interesting ideas, suggestions, or would like to contribute through pull requests, please feel free to do so.

## License

This project is available under the MIT license. See the [LICENSE](./LICENSE) file for more information.
