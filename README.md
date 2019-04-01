[![Build Status](https://travis-ci.org/Orlayhemmy/PMS.svg?branch=master)](https://travis-ci.org/Orlayhemmy/PMS)
[![Coverage Status](https://coveralls.io/repos/github/Orlayhemmy/PMS/badge.svg?branch=master)](https://coveralls.io/github/Orlayhemmy/PMS?branch=master)

# PMS
This is a basic API built to manage the population of people(Male and Female) in a location.

# API DOCS
This is the link to the [API docs](https://documenter.getpostman.com/view/4919704/S17xr5rr)

## Features
- Create a state
- Retrieve all states
- Delete a state
- Create a city
- Retrieve all cities
- Update a city
- Delete a city

# Technologies Used
- [Express](https://expressjs.com/)  is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [Postgres](https://www.postgresql.org/) is an open source object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance.

- [Babel](https://babeljs.io/) is a JavaScript compiler for converting codes written in ES6 to ES5 that is supported by many browsers

## Installation
- Clone this repository using the command:
 ```git clone https://github.com/Orlayhemmy/PMS```
 
- Navigate to the directory:
  ```cd PMS```
- Add your ```.env``` file with accurate variables as clearly defined in the `.env.sample` file
- Install all dependencies with ```yarn install```
- Start the development server by running:
  ```yarn start:dev``` OR
- Start the production server by running:
  ```yarn start:prod```
- Open up `PostMan` to test

## [](#test)Running the tests
To run the tests written for this application.

```
$ npm test       // backend tests
$ npm run client:test       //frontend tests
```

## Author
* **Olayemi Lawal**

## FAQ

### Is this an Open-Source Application?

Yes it is, and contributing to the development of this application is by raising PRs.

### How to contribute?

NB: contributions are very much welcome, please see the [Contribute.md](/Contribute.md) file on how to contribute

### What language was used to develop this application?

This project is a server-side(NodeJs) based application.

### Can I clone this application for personal use?

Yes! This application is licensed under MIT, and is open for whatever you may choose 
to use it for.