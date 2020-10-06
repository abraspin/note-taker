// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const notesJSONDB = require("../db/db.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    res.json(notesJSONDB);
  });

  //TODO:

  // POST Request
  // When user submits form data to server this will push the object JSON to our "database" file

  app.post("/api/notes", function (req, res) {
    // req.body is available since we're using the body parsing middleware
    notesJSONDB.push(req.body);
      res.json(true); //TODO: not sure if this line is needed, vestige from hot restaurant
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function (req, res) {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
// };
