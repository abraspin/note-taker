// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/notes", (req, res) => {
    //read the db.json file containing all saved notes (local path joins path to "DB"
    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
      //error handling
      if (err) throw err;
      // //parse the JSON in db.json //TODO: I think the next line already does this?
      // const notes = JSON.parse(data);
      //return the parsed information in the notes variable to display on screen to user
      return res.json(JSON.parse(data));
    });
  });

  //TODO:

  // POST Request
  // When user submits form data to server this will push the object JSON to our "database" file
  app.post("/api/notes", function (req, res) {
    // req.body is available since we're using the body parsing middleware
    notesJSONDB.push(req.body);
    res.json(true); //TODO: not sure if this line is needed, vestige from hot restaurant
  });

  app.delete("/api/notes/:id", function (req, res) {
    // req.body is available since we're using the body parsing middleware
    notesJSONDB.push(req.body);
    res.json(true); //TODO: not sure if this line is needed, vestige from hot restaurant
  });
};
// ---------------------------------------------------------------------------
// I added this below code so you could clear out the table while working with the functionality.
// Don"t worry about it!

//   app.post("/api/clear", function (req, res) {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
