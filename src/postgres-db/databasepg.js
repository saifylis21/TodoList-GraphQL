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

async function NewTask(title) {
    const databaseClient = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "mysecretpassword",
        database: "postgres"
    });

    try {
        await databaseClient.connect(); // Establish the database connection

        // Construct the INSERT query with placeholders
        const queryText = `
          INSERT INTO public."todoList" (title)
          VALUES ($1)
          RETURNING *;`;

        // Define the values for the placeholders
        const values = [title];

        // Execute the query with the provided values
        const result = await databaseClient.query(queryText, values);

        console.log("New record inserted:", result.rows[0]); // Log the inserted record
        return result.rows[0];
    } catch (err) {
        console.error(err); // Handle any errors
    } finally {
        await databaseClient.end(); // Close the database connection
    }
}


module.exports = { AllTasks, NewTask }