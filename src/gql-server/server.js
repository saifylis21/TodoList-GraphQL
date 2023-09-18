const { ApolloServer, gql } = require("apollo-server")
const AllTasks= require("../postgres-db/databasepg")

const typeDefs = gql`
    type Task {
        id: Int
        title: String
        done: Boolean
    }

    input NewTaskInput {
        title: String!
    }

    type Query {
        tasks: [Task]!
    }

    type Mutation {
        newTask(input: NewTaskInput): Task!
    }
`

const resolvers = {
    Query: {
        tasks() {
            return AllTasks()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000, () => console.log("Server is running at 4000"))