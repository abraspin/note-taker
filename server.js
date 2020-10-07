// npm required module
const express = require("express");

// Create an express server with Node
const app = express();

//Set local port, or deployed environment port (Heroku)
const PORT = process.env.PORT || 8080;

// Parse incoming data with middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//Point the server to route files
//(Immediately Invoked Function Expression)
require("./routing/api-routing")(app);
require("./routing/html-routing")(app);

//Listener ("Start" the server)
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
