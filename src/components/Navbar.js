import Link from "next/link"

const Navbar = () => (
    <div className="bg-gray-300 px-8 py-4 flex justify-around text-lg font-bold">
      <Link className="hover:underline" href="/">Home</Link>
      <Link className="hover:underline" href="/new">Add New Task</Link>
    </div>
)

export default Navbar