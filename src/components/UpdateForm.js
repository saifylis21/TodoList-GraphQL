const UpdateForm = ({
  updatedTitle,
  checked,
  setUpdatedTitle,
  setChecked,
  handleSubmit,
  updateDisable,
}) => (
    <form onSubmit={handleSubmit} className='mt-5'>
      <label className='mr-5'>Title:</label>
      <input
        className='py-1 px-2 border-2 border-sky-500'
        value={updatedTitle}
        name='updatedTaskTitle'
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <br />
      <label className='mr-5'>Done:</label>
      <input
        className='my-5'
        type='checkbox'
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <br />
      <button
        className='ml-3 px-2 py-1.5 bg-sky-500 text-base hover:underline disabled:opacity-50'
        disabled={updateDisable}
      >
        Update
      </button>
    </form>
);

export default UpdateForm;
