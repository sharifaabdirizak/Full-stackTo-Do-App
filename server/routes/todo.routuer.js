const express = require('express');
const todoRouter = express.Router();


// DB CONNECTION
const pool = require('../public/scripts/modules/pool.js');
const { DELETE } = require('sequelize/types/lib/query-types.js');

console.log('routers will display');

//GET
 

    tasksRouter.get('/', (req, res) => {
    //console.log('successful works');
        let queryText = `
        SELECT * FROM "todo app"
            ORDER BY "id";
        `;
        pool.query(queryText)
        .then((dbRes) => {
            //send back the array of tasks
            //console.log(DbRes.row)
            res.send(dbRes.rows);
        }).catch ((dbErr) => {
            console.log('error in GET', {queryText} , err);
            
        })
    })

    //POST
    taskRouter.post("/", (req, res) => {
        let newTask = req,body;
        console.log("rq.body:", req.body);

        const queryText = `
        INSERT INTO "todo app" ("name", "priority", "status", "notes")
        VALUES ($1, $2, $3, $4);`

    })
pool.query(queryText, [newTask.name, newTask.priority, newTask.ntatus, newTask.notes])
        .then(
            (DbRes) => {
                res.sendStatus(200);
            }
        ).catch(
            (DbErr) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            });

     //update
     taskRouter.put("/", (req, res) => {
        console.log('req.params', req, params);
        let idToUpdate = req.params.id
        
        let mySqlQuery = `
    UPDATE "todo app"
    SET "complete= $1
    WHERE ID = $2;`

 pool.query(mySqlQuery, [idToUpdate])
 .then
    ((DbRes) => {

        console.log('Update request successful,  ${idToUpdate}')
        res.sendStatus(200);
})
    
}).catch(
    (dbErr) => {
        console.log(`Update request failed: ${idToUpdate}`, err);
        res.sendStatus(500);
    }
)

//Delete

    


taskRouter.delete("/", (req, res) => {
    console.log('req.params', req, params);
    let idToDelete = req.params.id
    
    let mySqlQuery = `
Delete FROM "todo app"
WHERE ID = $1;`

pool.query(mySqlQuery, [idToDelete])
.then
((DbRes) => {

    console.log('Delete request successful", idToDelete}')
    res.sendStatus(202);
})

}).catch(
(dbErr) => {
    console.log(`Delete request failed: ${idToDelete}`, err);
    res.sendStatus(500);
})

module.exports = todoRouter;