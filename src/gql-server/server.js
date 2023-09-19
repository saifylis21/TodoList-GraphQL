const { ApolloServer, gql } = require("apollo-server")
const { AllTasks, NewTask, DeleteTask, TaskInfo, UpdateTask } = require("../postgres-db/databasepg")

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
    
    input UpdateTaskInput {
        id: Int!
        title: String!
        done: Boolean!
    }

    input GetTaskInput {
        id: Int!
    }

    type Query {
        tasks: [Task]!
        getTask(input: GetTaskInput!): Task!
    }

    type Mutation {
        newTask(input: NewTaskInput!): Task!
        deleteTask(input: DeleteTaskInput!): Task!
        updateTask(input: UpdateTaskInput!): Task!
    }
`

const resolvers = {
    Query: {
        tasks() {
            return AllTasks()
        },
        getTask(parent, {input}, ctx) {
            const task = TaskInfo(input.id)
            return task
        }
    },
    Mutation: {
        newTask(parent, {input}, ctx) {
            const task = NewTask(input.title)
            return task
        },
        deleteTask(parent, {input}, ctx) {
            const task = DeleteTask(input.id)
            return task
        },
        updateTask(parent, {input}, ctx) {
            const task = UpdateTask(input.id, input.title, input.done)
            console.log(task)
            return task
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000, () => console.log("Server is running at 4000"))