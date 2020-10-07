// Include path package dependency
var path = require("path");

// Routing
module.exports = function (app) {
  // What to do when user visits a page
  // Server will deliver each html file

  // localhost:3001/notes will return the notes.html file
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
