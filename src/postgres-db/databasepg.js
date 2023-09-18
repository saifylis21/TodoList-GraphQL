const { Client } = require("pg");

const databaseClient = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "mysecretpassword",
    database: "postgres"
})

// client.connect();

// const dbFunctions = {
//     AllTasks: client.query(`SELECT id, title, done FROM public."todoList";`, (err, res) => {
//         if(!err) {
//             console.log(res.rows);
//             return res.rows;
//         } else {
//             console.log(err)
//         }
//         client.end;
//     })
// }

// module.exports = dbFunctions;

module.exports = databaseClient