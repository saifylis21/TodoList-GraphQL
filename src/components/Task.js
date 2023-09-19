import gql_tasks from "@/gql-server/gql";
import { useMutation } from "@apollo/client";
import Link from "next/link";

const Task = ({id, title, done}) => {

    const [deleteTask, {data, loading, error}] = useMutation(gql_tasks.DELETE_TASK,
        {
            update(cache, { data: { deleteTask } }) {
                const { tasks } = cache.readQuery({ query: gql_tasks.ALL_TASKS });

                // Filter out the deleted task from the tasks array
                cache.writeQuery({
                    query: gql_tasks.ALL_TASKS,
                    data: { tasks: tasks.filter(task => task.id !== deleteTask.id) }
                })
            }
        }
    );
    
    return (
        <li className="flex justify-between my-4">
            <div className="flex">
                <h1 className="text-lg">{title}</h1>
                <p className="ml-2">{done ? "✅" : "⭕️"}</p>
            </div>

            <div className="flex">
                {loading ? <p>{loading ? "LOADING" : null}</p> : (
                    <>
                        <Link className="text-sky-500 mr-5 hover:underline" href={`/update/${encodeURIComponent(id)}`}>Edit</Link>
                        <button 
                            className="text-red-600 hover:underline"
                            onClick={() => deleteTask({variables: {deleteTask: {id: id}}})}
                            >Delete
                        </button>
                    </>
                )}
            </div>
        </li>
    )
}

export default Task;