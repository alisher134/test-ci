// libraries
import {
  type FC, useCallback, useEffect, useMemo, useState,
} from 'react';

import { v4 } from 'uuid';
import { MINUTE } from '../constants/common';
import { getJSONFromLS, setToLS } from '../helpers/localStorage';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoSort from './TodoSort';

export interface Todo {
  id: string;
  title: string;
  deadline: string | null;
  isCompleted: boolean;
}

export type Sort = 'all' | 'active' | 'complete';

const App: FC = () => {
  const storedTodo = getJSONFromLS('todo') || [];
  const [sortType, setSortType] = useState<Sort>('all');
  const [todos, setTodos] = useState<Todo[]>(storedTodo);

  const handleAddTodo = useCallback(({ deadline, title }: Omit<Todo, 'id' | 'isCompleted'>) => {
    const id = v4();
    const isCompleted = false;

    setTodos((prev) => [
      ...prev,
      {
        id, title, deadline, isCompleted,
      },
    ]);
  }, []);

  const handleDeleteTodo = useCallback((id: Todo['id']) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleCompleteTodo = useCallback((id: Todo['id']) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }

      return todo;
    }));
  }, []);

  const handleSortTodo = (type: Sort) => setSortType(type);

  const filteredTodos = useMemo(() => {
    switch (sortType) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter((todo) => todo.isCompleted === false);

      case 'complete':
        return todos.filter((todo) => todo.isCompleted === true);

      default:
        return todos;
    }
  }, [todos, sortType]);

  useEffect(() => {
    setToLS('todo', todos);
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setTodos((prev) => prev.filter((todo) => {
        if (todo.deadline === null) {
          return true;
        }

        return new Date(todo.deadline).getTime() > now;
      }));
    }, MINUTE);

    return () => clearInterval(interval);
  }, []);

  const activeTodos = useMemo(() => filteredTodos.length, [filteredTodos]);

  const renderMessage = () => (todos.length ? (
    <>
      Ваши оставшиеся тудушки:
      {activeTodos}
    </>
  ) : <>Нет активных тудушек в этом списке</>);

  return (
    <div className="container">
      <h1 className="title">To Do</h1>
      <TodoForm handleAddTodo={handleAddTodo} />

      <TodoSort handleSortTodo={handleSortTodo} />

      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} todos={filteredTodos} />

      <p className="active-todos">
        {renderMessage()}
      </p>
    </div>
  );
};

export default App;
