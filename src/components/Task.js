const Task = ({title, done}) => (
    <li className="flex my-4">
        <h1 className="text-lg">{title}</h1>
        <p className="ml-2">{done ? "✅" : "⭕️"}</p>
    </li>
)

export default Task;