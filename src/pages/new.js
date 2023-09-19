import { useMutation } from '@apollo/client'
import { useState } from 'react'
import gql_tasks from '@/gql-server/gql'

export default function New() {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [createTask, {data, loading, error}] = useMutation(gql_tasks.NEW_TASK,
        {
            update(cache, { data: { newTask } }) {
                const { tasks } = cache.readQuery({ query: gql_tasks.ALL_TASKS });

                // Insert the new task into the tasks array
                cache.writeQuery({
                    query: gql_tasks.ALL_TASKS,
                    data: { tasks: tasks.concat([newTask]) }
                })
            }
        }
    );

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