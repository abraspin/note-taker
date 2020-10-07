// const { Console } = require("console"); //FIXME:
// Dependencies
const fs = require("fs");
const path = require("path");

// This global variable uniquely identifies each note
let globalID = 1;
//path to local DB (JSON Object array)
const DBPath = path.join(__dirname, "../db/db.json");

// ROUTING
module.exports = function (app) {
  ////////////GET ALL NOTES
  app.get("/api/notes", (req, res) => {
    //read the db.json file containing all saved notes (local path joins path to "DB")
    fs.readFile(DBPath, (err, data) => {
      if (err) throw err;
      //return the parsed information in the notes "DB" and displays on screen
      // console.log(JSON.parse(data));
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
        // res.end();
        res.json(newNote);
      });
    });
  });
  ///////////////DELETE NOTE
  app.delete("/api/notes/:id", function (req, res) {
    var IDToDelete = parseInt(req.params.id);

    // console.log("Attempting to delete note# " + IDToDelete + "...");
    fs.readFile(DBPath, (err, data) => {
      if (err) throw err;
      let newNotesArray = JSON.parse(data);

      //look for an object with matching ID property to submitted id
      //FIXME: there has to be a better way than this loop!
      for (let i = 0; i < newNotesArray.length; i++) {
        if (parseInt(newNotesArray[i].id) === IDToDelete) {
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

//TODO: Am I going to have a synchronicity issue here?
// TODO: Should I use promises instead? How would I put this in the route, then use a .then or something?
// function readNotesDB() {
//   fs.readFile(DBPath, (err, data) => {
//     if (err) throw err;
//     return res.json(JSON.parse(data));
//   });
// }
