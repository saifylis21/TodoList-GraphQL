const { ApolloServer, gql } = require("apollo-server")
const { AllTasks, NewTask, DeleteTask } = require("../postgres-db/databasepg")

const typeDefs = gql`
    type Task {
        id: Int
        title: String
        done: Boolean
    }

    input NewTaskInput {
        title: String!
    }

    input DeleteTaskInput {
        id: Int!
    }

    type Query {
        tasks: [Task]!
    }

    type Mutation {
        newTask(input: NewTaskInput!): Task!
        deleteTask(input: DeleteTaskInput!): Task!
    }
`

const resolvers = {
    Query: {
        tasks() {
            return AllTasks()
        }
    },
    Mutation: {
        newTask(parent, {input}, ctx) {
            const task = NewTask(input.title)
            return task
        },
        deleteTask(parent, {input}, ctx) {
            console.log("ID:", input)
            const task = DeleteTask(input.id)
            return task
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000, () => console.log("Server is running at 4000"))