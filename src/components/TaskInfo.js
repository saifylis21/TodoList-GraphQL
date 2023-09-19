const TaskInfo = ({title, done}) => (
    <>
        <h2 className='text-lg'><span className='font-bold mr-3'>Title:</span>{title}</h2>
        <h2 className='text-lg'><span className='font-bold mr-3'>Done:</span>{done ? "✅" : "⭕️"}</h2>
    </>
);


export default TaskInfo;