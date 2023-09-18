import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const ALL_TASKS = gql`
  query AllPets {
    tasks {
      id
      title
      done
    }
  }
`

export default function Home() {

  const {data, loading} = useQuery(ALL_TASKS);
  console.log("data:", data);

  return (<h1>Hi</h1>)
}