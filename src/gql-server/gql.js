import gql from 'graphql-tag'

const ALL_TASKS = gql`
  query AllTasks {
    tasks {
      id
      title
      done
    }
  }
`

const NEW_TASK = gql`
  mutation CreateATask($newTask: NewTaskInput!) {
    newTask(input: $newTask) {
      id
      title
      done
    }
  }
`

const gql_tasks = {
    ALL_TASKS: ALL_TASKS,
    NEW_TASK: NEW_TASK
}

export default gql_tasks