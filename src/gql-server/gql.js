import gql from 'graphql-tag'

const TASK_FIELDS = gql`
  fragment TaskFields on Task {
    id
    title
    done
  }
`

const ALL_TASKS = gql`
  query AllTasks {
    tasks {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`

const GET_TASK = gql`
  query GetATask($task: GetTaskInput!) {
    getTask(input: $task) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`

const NEW_TASK = gql`
  mutation CreateATask($newTask: NewTaskInput!) {
    newTask(input: $newTask) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`

const DELETE_TASK = gql`
  mutation DeleteATask($deleteTask: DeleteTaskInput!) {
    deleteTask(input: $deleteTask) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`

const UPDATE_TASK = gql`
  mutation UpdateATask($updateTask: UpdateTaskInput!) {
    updateTask(input: $updateTask) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`

const gql_tasks = {
    ALL_TASKS: ALL_TASKS,
    GET_TASK: GET_TASK,
    NEW_TASK: NEW_TASK,
    DELETE_TASK: DELETE_TASK,
    UPDATE_TASK: UPDATE_TASK
}

export default gql_tasks