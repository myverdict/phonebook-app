require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const Phonebook = require("./models/phonebook");

const app = express();

app.use(cors()); // cors middleware
app.use(express.json()); // json parser middleware
// https://stackoverflow.com/a/55848217/9621971
morgan.token("body", (req, res) => JSON.stringify(req.body)); // morgan middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist")); // static middleware

app.get("/info", (request, response) => {
  const date = new Date();

  Phonebook.find({}).then((persons) => {
    response.send(
      `<div><p>Phonebook has info for ${persons.length} people</p><p>${date}</p></div>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Phonebook.findById(request.params.id).then((person) => response.json(person));
});

// app.post("/api/persons", (request, response) => {
//   const body = request.body;

//   if (!body.name && !body.number) {
//     return response.status(400).json({
//       error: "name and number missing",
//     });
//   } else if (!body.name) {
//     return response.status(400).json({
//       error: "name missing",
//     });
//   } else if (!body.number) {
//     return response.status(400).json({
//       error: "number missing",
//     });
//   }

//   const isFound = persons.find(
//     (person) => person.name.toLowerCase() === body.name.toLowerCase()
//   );

//   if (isFound) {
//     return response.status(400).json({
//       error: "name already exists. name must be unique",
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), // 9007199254740991
//   };
//   persons = persons.concat(person);
//   response.json(person);
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
