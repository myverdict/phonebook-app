const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const name = process.argv[3] || undefined;
const number = process.argv[4] || undefined;

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const phonebookSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', phonebookSchema);

if (name && number) {
  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    console.log('phonebook: ');
    persons.forEach((person) => {
      console.log(person.name, person.number);
    });

    mongoose.connection.close();
  });
}
