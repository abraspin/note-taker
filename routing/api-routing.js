// Dependencies
const fs = require("fs");
const path = require("path");

const DBPath = path.join(__dirname, "../db/db.json");

// ROUTING
module.exports = function (app) {
  ////////////GET ALL NOTES
  app.get("/api/notes", (req, res) => {
    //read the db.json file containing all saved notes (local path joins path to "DB")
    fs.readFile(DBPath, (err, data) => {
      if (err) throw err;
      //return the parsed information in the notes "DB" and displays on screen
      return res.json(JSON.parse(data));
    });
  });

  ////////////////// ADD NOTE
  // When user submits form data to server this will push the object JSON to our "database" file
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;

    //note identifier
    newNote.id = Math.floor(Math.random() * 1000000000000);
    fs.readFile(DBPath, (err, data) => {
      //error handling
      if (err) throw err;
      let notesList = JSON.parse(data);
      notesList.push(newNote);

      //Re-write the db.json file with updated notes new array
      fs.writeFile(DBPath, JSON.stringify(notesList), "utf8", (err) => {
        if (err) throw err;

        // send new note back with response
        res.json(newNote);
      });
    });
  });

  ///////////////DELETE NOTE
  app.delete("/api/notes/:id", function (req, res) {
    var IDToDelete = parseInt(req.params.id);

    fs.readFile(DBPath, (err, data) => {
      if (err) throw err;
      let newNotesArray = JSON.parse(data);

      //look for an object with matching ID property to submitted id
      for (let i = 0; i < newNotesArray.length; i++) {
        if (parseInt(newNotesArray[i].id) === IDToDelete) {
          newNotesArray.splice(i, 1);
        }
      }

      fs.writeFile(DBPath, JSON.stringify(newNotesArray), "utf8", (err) => {
        if (err) throw err;

        //telling the program that the function is over
        res.json({ deletedID: IDToDelete });
      });
    });
  });
};
