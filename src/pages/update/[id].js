import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import gql_tasks from '@/gql-server/gql';
import { useEffect, useState } from 'react';
import TaskInfo from '@/components/TaskInfo';
import UpdateForm from '@/components/UpdateForm';

function Update() {

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  // GET TASK INFO VIA ID VALUE THAT IS RETRIEVED FROM THE QUERY
  const {data, loading, error} = useQuery(gql_tasks.GET_TASK, {
    variables: { task: { id: parseInt(id) } },
  });

  // READY UP UPDATE TASK FUNCTION
  const [updateTask, {updateData, updateLoading, updateError}] = useMutation(gql_tasks.UPDATE_TASK);

  useEffect(() => {
    // Check if data has loaded and contains the necessary fields
    if (!loading && !error && data && data.getTask) {
      // Update the state with data from the query
      setUpdatedTitle(data.getTask.title);
      setChecked(data.getTask.done);
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (data && data.getTask.title === updatedTitle && data.getTask.done === checked) {
      setUpdateDisable(true);
    } else {
      setUpdateDisable(false);
    }
  }, [data, updatedTitle, checked]); // Run this effect when data, updatedTitle, or checked changes

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

        {data && data.getTask && <TaskInfo title={data.getTask.title} done={data.getTask.done} />}

        {data && data.getTask && (
          <UpdateForm
            updatedTitle={updatedTitle}
            checked={checked}
            setUpdatedTitle={setUpdatedTitle}
            setChecked={setChecked}
            handleSubmit={handleSubmit}
            updateDisable={updateDisable}
          />
        )}

      <p className='mt-2'>
        {updateLoading ? 'LOADING' : null}
        {updateData && updateLoading === false ? 'Task Updated Successfully' : null}
      </p>

    </div>
  );
}

export default Update;