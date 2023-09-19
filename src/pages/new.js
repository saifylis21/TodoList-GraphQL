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
    const [createTask, {data, loading, error}] = useMutation(NEW_TASK)

    console.log(data, loading, error)

    const handleSubmit = (event) => {
        event.preventDefault();
        createTask({variables: {newTask: {title: newTaskTitle}}});
        setNewTaskTitle("")
    }

    return (

        <div className='mt-5 mx-7'>
            <h1 className='font-bold text-3xl mb-5'>Enter New Task Title Below:</h1>

            <form onSubmit={handleSubmit}>
                <input className='py-1 px-2 border-2 border-sky-500' name="newTaskTitle" value={newTaskTitle} onChange={event => setNewTaskTitle(event.target.value)}/>
                <button className='ml-3 px-2 py-1.5 bg-sky-500 text-base hover:underline'>Enter Task</button>
            </form>

            <p className='mt-2'>{loading ? "LOADING" : null}{data && loading == false ? "Task Record Added Successfully" : null}</p>
        </div>

    )
}