import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Task from '../components/Task';

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

  const {data, loading, error} = useQuery(ALL_TASKS);

  let AllTasks = <h1 className='font-bold text-3xl mt-4 text-center'>NO TASKS YET</h1>

  if(data && data.tasks.length != 0) {
    AllTasks = data.tasks.map(task => <Task key={task.id} {...task} />)
  }

  return (
    <>
      <ul className='mx-7'>
        {AllTasks}
      </ul>
    </>
  )
}
