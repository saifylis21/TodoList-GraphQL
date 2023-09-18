import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useState } from 'react'

const NEW_TASK = gql`
  mutation CreateATask($newTask: NewTaskInput!) {
    newTask(input: $newTask) {
      id
      title
      done
    }
  }
`

export default function New() {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [createTask, newTask] = useMutation(NEW_TASK)

    // console.log("LOOOOK", newTask)

    const handleChange = (event) => {
        console.log(event.target.value);
        setNewTaskTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createTask({variables: {newTask: {title: newTaskTitle}}});
    }

    return (

        <>
            <h1>NEWWWWWWWWWW</h1>

            <form onSubmit={handleSubmit}>
                <input name="newTaskTitle" value={newTaskTitle} onChange={handleChange}/>
                <button></button>
            </form>
        </>

    )
}