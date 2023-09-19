const { Client } = require("pg");

async function connectAndExecute(queryFunction) {
    const databaseClient = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "mysecretpassword",
        database: "postgres",
    });

    try {
        await databaseClient.connect(); // Establish the database connection
        return await queryFunction(databaseClient); // Execute the query function
    } catch (err) {
        console.error(err); // Handle any errors
    } finally {
        await databaseClient.end(); // Close the database connection
    }
}

async function AllTasks() {
    return connectAndExecute(async (client) => {
        const queryText = 'SELECT id, title, done FROM public."todoList";';
        const result = await client.query(queryText);
        console.log(result.rows);
        return result.rows;
    });
}

async function NewTask(title) {
    return connectAndExecute(async (client) => {
        const queryText = `
          INSERT INTO public."todoList" (title)
          VALUES ($1)
          RETURNING *;`;
        const values = [title];
        const result = await client.query(queryText, values);
        console.log("New record inserted:", result.rows[0]);
        return result.rows[0];
    });
}

async function DeleteTask(id) {
    return connectAndExecute(async (client) => {
        const queryText = `
          DELETE FROM public."todoList"
          WHERE id = $1
          RETURNING *;`;
        const values = [id];
        const result = await client.query(queryText, values);
        if (result.rowCount === 1) {
            console.log("Record deleted:", result.rows[0]);
            return result.rows[0];
        } else {
            console.log("No record found with the provided id:", id);
            return null;
        }
    });
}

async function TaskInfo(id) {
    return connectAndExecute(async (client) => {
        const queryText = `
          SELECT id, title, done
          FROM public."todoList"
          WHERE id = $1
          LIMIT 1;`;
        const values = [id];
        const result = await client.query(queryText, values);
        if (result.rowCount === 1) {
            console.log("Record Found:", result.rows[0]);
            return result.rows[0];
        } else {
            console.log("No record found with the provided id:", id);
            return null;
        }
    });
}

async function UpdateTask(id, newTitle, newDone) {
    return connectAndExecute(async (client) => {
        const queryText = `
          UPDATE public."todoList"
          SET title = $1, done = $2
          WHERE id = $3
          RETURNING *;`;
        const values = [newTitle, newDone, id];
        const result = await client.query(queryText, values);
        if (result.rowCount === 1) {
            console.log("Record Updated:", result.rows[0]);
            return result.rows[0];
        } else {
            console.log("No record found with the provided id:", id);
            return null;
        }
    });
}

module.exports = { AllTasks, NewTask, DeleteTask, TaskInfo, UpdateTask }