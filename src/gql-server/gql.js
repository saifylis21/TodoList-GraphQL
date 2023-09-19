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

const GET_TASK = gql`
  query GetATask($task: GetTaskInput!) {
    getTask(input: $task) {
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

const DELETE_TASK = gql`
  mutation DeleteATask($deleteTask: DeleteTaskInput!) {
    deleteTask(input: $deleteTask) {
      id
      title
      done
    }
  }
`

const UPDATE_TASK = gql`
  mutation UpdateATask($updateTask: UpdateTaskInput!) {
    updateTask(input: $updateTask) {
      id
      title
      done
    }
  }
`

const gql_tasks = {
    ALL_TASKS: ALL_TASKS,
    GET_TASK: GET_TASK,
    NEW_TASK: NEW_TASK,
    DELETE_TASK: DELETE_TASK,
    UPDATE_TASK: UPDATE_TASK
}

export default gql_tasks