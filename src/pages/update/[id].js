import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import gql_tasks from '@/gql-server/gql';
import { useState } from 'react';

function Update() {
  const router = useRouter();
  const { id } = router.query;

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [checked, setChecked] = useState(false);

  const {data, loading, error} = useQuery(gql_tasks.GET_TASK, {
    variables: { task: { id: parseInt(id) } },
  });

  const [updateTask, {updateData, updateLoading, updateError}] = useMutation(gql_tasks.UPDATE_TASK);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTask({
      variables: { updateTask: {
        id: parseInt(id),
        title: updatedTitle,
        done: checked
      } }
    })
  }

  return (
    <div className='mt-5 mx-7'>
        <h1 className='font-bold text-3xl mb-5'>Updating Record ID: {id}</h1>

        <h2 className='text-lg'><span className='font-bold'>Title:</span> {data && data.getTask ? data.getTask.title : null}</h2>
        <h2 className='text-lg'><span className='font-bold'>Done:</span>  {data && data.getTask 
                    ? data.getTask.done 
                      ? "✅"
                      : "⭕️"
                    : null}
        </h2>

        <form onSubmit={handleSubmit} className='mt-5'>
            <label className='mr-5'>Title:</label>
            <input className='py-1 px-2 border-2 border-sky-500'
              value={updatedTitle}
              name="updatedTaskTitle" 
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <br />
            <label className='mr-5'>Done:</label>
            <input className='py-1 px-2 my-5 border-2 border-sky-500'
              value={checked}
              type="checkbox"
              onChange={() => setChecked(!checked)}
            />
            <br />
            <button className='ml-3 px-2 py-1.5 bg-sky-500 text-base hover:underline'>Update</button>
        </form>

        <p className='mt-2'>{updateLoading ? "LOADING" : null}{updateData && updateLoading == false ? "Task Updated Successfully" : null}</p>
    </div>
  );
}

export default Update;