import type { Todo } from "../App";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  handleDeleteTodo: (todoId: Todo['id']) => void;
  handleCompleteTodo: (todoId: Todo['id']) => void;
};

const TodoList = ({ todos, handleDeleteTodo, handleCompleteTodo }: Props) => (
  <ul className="todo-list">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        deadline={todo.deadline}
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
        id={todo.id}
        isCompleted={todo.isCompleted}
        title={todo.title}
      />
    ))}
  </ul>
);

export default TodoList;
