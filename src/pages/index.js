import { useQuery, useMutation } from '@apollo/client'
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

export default function Home() {

  const {data, loading} = useQuery(ALL_TASKS);

  let AllTasks = <h1>NO TASKS YET</h1>

  if(data) {
    AllTasks = data.tasks.map(task => (
      <div key={task.id}>
        <h1>
          {task.title}
        </h1>
      </div>
    ))
  }

  return (
    <>
      <h1>HI</h1>
      {AllTasks}
    </>
  )
}
