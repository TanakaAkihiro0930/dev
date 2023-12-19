import AddNewTodoForm from "./AddNewTodoForm";
import TodosList from "./TodosList";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* APP HEADING / TITLE */}
        <h1 className="my-5 text-4xl font-bold text-black">Todo App</h1>

        {/* ADD NEW TODOS FORM COMPONENT */}
        <AddNewTodoForm />

        {/* TODOS LIST COMPONENTS */}
        <TodosList />
      </div>
    </div>
  );
};

export default HomePage;
