const mongoose = require("mongoose");

//We will only read from applications so we don't need to define a schema

const appSchema = new mongoose.Schema({}, { collection: "Applications" });

const App = mongoose.model("Application", appSchema);

module.exports = App;
