require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const Person = require('./models/phonebook');

const app = express();

app.use(express.json()); // json parser middleware
app.use(cors()); // cors middleware
// https://stackoverflow.com/a/55848217/9621971
morgan.token('body', (req, res) => JSON.stringify(req.body)); // morgan middleware
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(express.static('dist')); // static middleware

app.get('/info', (request, response) => {
  const date = new Date();

  Person.find({}).then((persons) => {
    response.send(
      `<div><p>Phonebook has info for ${persons.length} people</p><p>${date}</p></div>`
    );
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      console.log('person saved');
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        console.log('updated person');
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(`${error.name}: ${error.message}`);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response
      .status(400)
      .send({ error: `${error.name}: ${error.message}` });
  }

  next(error);
};

// handler of requests with result to errors
// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
