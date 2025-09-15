// libraries
import {
  type ChangeEvent, type FC, useState,
} from 'react';
import type { Todo } from '../App';
import Button from '../shared/Button';
import Input from '../shared/Input';

type Props = {
  handleAddTodo: ({ deadline, title }:Omit<Todo, 'id' | 'isCompleted'>) => void;
};

const TodoForm: FC<Props> = ({ handleAddTodo }) => {
  const [taskTitle, setTaskTitle] = useState<Todo['title']>('');
  const [taskTitleError, setTaskTitleError] = useState<string | null>(null);
  const [taskDeadline, setTaskDeadline] = useState<Todo['deadline']>('');

  const handleSubmit = () => {
    const titleIsEmpty = taskTitle.length === 0;
    const deadlineIsEmpty = taskDeadline.length === 0;

    if (titleIsEmpty) {
      setTaskTitleError('Название тудушки обязателен!');

      return;
    }

    if (deadlineIsEmpty && !titleIsEmpty) {
      handleAddTodo({ title: taskTitle, deadline: null });
    }

    if (!titleIsEmpty && !deadlineIsEmpty) {
      handleAddTodo({ title: taskTitle, deadline: taskDeadline });
    }

    setTaskTitle('');
    setTaskDeadline('');
  };

  return (
    <form className="todo-form">
      <div className="todo-form-inputs">
        <Input
          className="todo-form-input"
          onChange={(e:ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
          placeholder="Добавить новый туду *"
          value={taskTitle}
        />
        {taskTitleError && <p className="todo-form-error">{taskTitleError}</p>}

        <Input
          onChange={(e:ChangeEvent<HTMLInputElement>) => setTaskDeadline(e.target.value)}
          type="datetime-local"
          value={taskDeadline}
        />
      </div>

      <Button className="todo-form-button" onClick={handleSubmit} type="button">
       plus
      </Button>
    </form>
  );
};

export default TodoForm;
