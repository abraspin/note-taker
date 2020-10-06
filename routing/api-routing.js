const { Console } = require("console"); //FIXME: WTF IS THIS
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const fs = require("fs");
const path = require("path");
// This global variable uniquely identifies each note //TODO: change back to "1" after testing
let globalID = 2;

const DBPath = path.join(__dirname, "../db/db.json");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  ////////////GET ALL NOTES
  app.get("/api/notes", (req, res) => {
    //read the db.json file containing all saved notes (local path joins path to "DB"
    fs.readFile(DBPath, (err, data) => {
      if (err) throw err;
      //return the parsed information in the notes "DB" and displays on screen
      console.log(JSON.parse(data));
      return res.json(JSON.parse(data));
    });
  });

  ////////////////// ADD NOTE
  // When user submits form data to server this will push the object JSON to our "database" file
  app.post("/api/notes", function (req, res) {
    // console.log("req.body", req.body);
    const newNote = req.body;
    newNote.id = globalID;
    globalID++;
    // console.log("globalID", globalID);
    // console.log("newNote", newNote);

    fs.readFile(DBPath, (err, data) => {
      //error handling
      if (err) throw err;
      let notesList = JSON.parse(data);
      // console.log(JSON.parse(data));
      notesList.push(newNote);
      // console.log("notesList", notesList);

      //Re-write the db.json file with updated notes new array
      fs.writeFile(DBPath, JSON.stringify(notesList), "utf8", (err) => {
        //1-liner error handling
        if (err) throw err;

        //telling the program that the function is over
        res.end();
      });
    });
  });
  ///////////////DELETE NOTE
  app.delete("/api/notes/:id", function (req, res) {
    var IDToDelete = parseInt(req.params.id);

    console.log("Attempting to delete note# " + IDToDelete + "...");
    //FIXME: there has to be a better way than this loop!
    fs.readFile(DBPath, (err, data) => {
      if (err) throw err;
      let newNotesArray = JSON.parse(data);
      console.log("newNotesArray", newNotesArray);
      //look for an object with matching ID property to submitted id
      for (let i = 0; i < newNotesArray.length; i++) {
        console.log(newNotesArray[i].id);
        if (parseInt(newNotesArray[i].id) === IDToDelete) {
          console.log("newNotesArray[i]", newNotesArray[i]);
          console.log("deleting note# " + IDToDelete);
          newNotesArray.splice(i, 1);
        }
      }

      fs.writeFile(DBPath, JSON.stringify(newNotesArray), "utf8", (err) => {
        //1-liner error handling
        if (err) throw err;

        //telling the program that the function is over
        res.end();
      });
    });
    //TODO: Do I need `res.end();` here as a redundancy in case it fails? or will the throw error take care of that?
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

//TODO: Am I going to have a synchronicity issue here?
// TODO: Should I use promises instead? How would I put this in the route, then use a .then or something?
// function readNotesDB() {
//   fs.readFile(DBPath, (err, data) => {
//     if (err) throw err;
//     return res.json(JSON.parse(data));
//   });
// }
