require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phonebookSchema = new mongoose.Schema({
  // mongoose validation
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);
