const express = require("express");
const todoRouter = express.Router();

// DB CONNECTION

const pool = require("../modules/pool.js");

console.log("routers will display");

//GET
todoRouter.get("/", (req, res) => {
  //console.log('successful works');
  let queryText = `
        SELECT * FROM "todo app"
            ORDER BY "id";
        `;
  pool
    .query(queryText)
    .then((dbRes) => {
      //send back the array of tasks
      //console.log(DbRes.row)
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log("error in GET", { queryText }, dbErr);
    });
});

//POST
todoRouter.post("/", (req, res) => {
  let newTask = req.body;
  console.log("rq.body:", req.body);

  const queryText = `
        INSERT INTO "todo app" ("task", "priority", "status", "notes")
        VALUES ($1, $2, $3, $4);`;

  pool
    .query(queryText, [
      newTask.name,
      newTask.priority,
      newTask.status,
      newTask.note,
    ])
    .then((DbRes) => {
      res.sendStatus(200);
    })
    .catch((DbErr) => {
      console.log(`Err making query ${queryText}`, DbErr);
      res.sendStatus(500);
    });
});

//Update
todoRouter.put("/:id", (req, res) => {
  console.log("req.params", req.params);
  let idToUpdate = req.params.id;

  let mySqlQuery = `
    UPDATE "todo app"
    SET "status" = $1
    WHERE "id" = $2;`;

  pool
    .query(mySqlQuery, [true, idToUpdate])
    .then((DbRes) => {
      console.log("Update request successful,  ${idToUpdate}");
      res.sendStatus(200);
    })
    .catch((DbErr) => {
      console.log(`Update request failed: ${idToUpdate}`, DbErr);
      res.sendStatus(500);
    });
});

//Delete
todoRouter.delete("/:id", (req, res) => {
  console.log("req.params", req.params);
  let idToDelete = req.params.id;

  let mySqlQuery = `
Delete FROM "todo app"
WHERE ID = $1;`;

  pool
    .query(mySqlQuery, [idToDelete])
    .then((DbRes) => {
      console.log('Delete request successful", idToDelete}');
      res.sendStatus(202);
    })
    .catch((dbErr) => {
      console.log(`Delete request failed: ${idToDelete}`, err);
      res.sendStatus(500);
    });
});


module.exports = todoRouter;
