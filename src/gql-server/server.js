const { ApolloServer, gql } = require("apollo-server")
const databaseClient = require ("../postgres-db/databasepg")

const typeDefs = gql`
    type Task {
        id: Int
        title: String
        done: Boolean
    }

    type Query {
        tasks: [Task]!
    }
`

databaseClient.connect()

const resolvers = {
    Query: {
        tasks() {
            return databaseClient.query(`SELECT id, title, done FROM public."todoList";`, (err, res) => {
                        if(!err) {
                            console.log(res.rows);
                            return res.rows;
                        } else {
                            console.log(err)
                        }
                        databaseClient.end;
                    })

        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000, () => console.log("Server is running at 4000"))