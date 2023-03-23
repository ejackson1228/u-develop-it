 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)] 
# <h1 align="center">U-Develop-It</h1>

## Description
A node.js & mySQL application built to track an election for a fictional coding club. 
  
## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributors](#contributors)
  - [Tests](#tests)
  - [Questions](#questions)

## Installation
1. Copy this repository to your local machine.
2. Install necessary packages.
3. In the root of the application, create a new .env file with <br>`mySQL_USER = '[your mySQL username]'`  <br> `mySQL_PASS = '[your mySQL password]'` 
4. In mySQL shell run 
 - `source db.sql` (to initiate a new database) <br>
 - `source schema.sql` (to schema your new database) <br>
 - `source seeds.sql` (to seed your new database) <br>
5. View your data with Insomnia or any other API testing suite of your choice by visiting `localhost:3001/api/[route]`. 

## Usage
Track an election's progress, candidates, candidate information, and votes. 

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]This application is covered under the MIT license. (https://opensource.org/licenses/MIT)

## Contributors
- node.js (https://nodejs.org/en)
- mySQL (https://www.mysql.com/)  
- express.js (https://expressjs.com/)
- jest (https://jestjs.io/)

## Tests
to run tests on inputCheck(), run `npm test`

## Questions? Contact me:
GitHub: https://github.com/ejackson1228/ <br>
Email: ejackson1228@gmail.com

