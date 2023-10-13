require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const Person = require("./models/phonebook");

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

  Person.find({}).then((persons) => {
    response.send(
      `<div><p>Phonebook has info for ${persons.length} people</p><p>${date}</p></div>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => response.json(person));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "name and number missing",
    });
  } else if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    console.log("person saved");
    response.json(savedPerson);
  });
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
