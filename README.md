# uoh-fullstack-open-2023-part3

## Phonebook application - University of Helsinki (Deep Dive Into Modern Web Development, Part 3: Programming a server with NodeJS and Express)

Install dependencies from the root of the project/application:

```
npm i
```

To run the application, in the terminal run the below command:

- For practice purposes:

```
node mongo.js yourpassword Anna 040-1234556

node mongo.js yourpassword "Arto Vihavainen" 045-1232456

node mongo.js yourpassword
```

- Actual notes application

```
npm run dev
```

On the browser, visit for get requests for get requests:

- http://localhost:3001/info
- http://localhost:3001/api/persons
- http://localhost:3001/api/persons/1

You can also perform these operations on Postman/VS Code REST client.

---

REST HTTP Methods for the notes application:

| URL            | verb   | functionality                                                          |
| -------------- | ------ | ---------------------------------------------------------------------- |
| info           | GET    | fetches the total number of entries in the collection and current date |
| api/persons    | GET    | fetches all resources in the collection                                |
| api/persons/1  | GET    | fetches a single resource                                              |
| api/persons    | POST   | creates a new resource based on the request data                       |
| api/persons/1  | PUT    | replaces the entire identified resource with the request data          |
| /api/persons/1 | DELETE | removes the identified resource                                        |

---

### Part 3 - (a) Node.js and Express

Exercises 3.1 - 3.8 --> phonebook backend express server app

### Part 3 - (b) Deploying app to internet

Exercises 3.9 - 3.11 --> phonebook backend express server app (contd. from part 3a)

### Part 3 - (c) Saving data to MongoDB

phonebook backend express server app (contd. from part 3b)

Exercises 3.12 --> Command line database

Exercises 3.13 - 3.14 --> Phonebook database

Exercises 3.15 - 3.18 --> Phonebook database

### Part 3 - (d) Validation and ESLint

Exercises 3.19 - 3.21 --> Phonebook database & deploying the database backend to production

Exercise 3.22 --> Lint configuration

#### Requirements for the application:

1. Express - Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js

```
npm install express
```

2. Nodemon - reload, automatically

```
npm install --save-dev nodemon
```

3. Morgan middleware (HTTP request logger middleware for node.js)

```
npm install morgan
```

4. CORS middleware (Cross-Origin Resource Sharing)

```
npm install cors
```

5. Deployed on [render](https://render.com/) - Cloud Application Hosting for Developers

https://phonebook-app-zim0.onrender.com/

When the app is deployed in Render, make sure that the env variables from this project is saved in the Render web service --> Environment

6. MongoDB Atlas - A MongoDB provider. Create an account (here)[https://www.mongodb.com/atlas/database] and choose the free option. (MongoDB is a document-oriented NoSQL database)

7. Mongoose - Object Document Mapper library for MongoDB

```
npm install mongoose
```

8. dotenv - used for environment variables

```
npm install dotenv
```
