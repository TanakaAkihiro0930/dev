import EditTodoForm from "./EditTodoForm";

const EditPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* APP HEADING / TITLE */}
        <h1 className="my-5 text-4xl font-bold text-black">Todo App</h1>

        {/* TODO EDIT FORM COMPONENT */}
        <EditTodoForm />
      </div>
    </div>
  );
};

export default EditPage;
