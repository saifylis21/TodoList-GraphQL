const { Client } = require("pg");

async function AllTasks() {

    const databaseClient = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "mysecretpassword",
        database: "postgres"
    })

    try {
        await databaseClient.connect(); // Establish the database connection
        const queryText = 'SELECT id, title, done FROM public."todoList";';
        const result = await databaseClient.query(queryText); // Execute the query
        console.log(result.rows); // Log the query results
        return result.rows
    } catch (err) {
        console.error(err); // Handle any errors
    } finally {
        await databaseClient.end(); // Close the database connection
    }
}

module.exports = AllTasks