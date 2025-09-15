// libraries
import { type ChangeEvent, useState } from 'react';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import clsx from 'clsx';
import type { Todo } from '../../App';
import Checkbox from '../../shared/Checkbox';
import ConfirmModal from '../../shared/ConfirmModal';

interface Props extends Todo {
  handleDeleteTodo: (todoId: Todo['id']) => void;
  handleCompleteTodo: (todoId: Todo['id']) => void;
}

const TodoItem = ({
  id, title, deadline, isCompleted, handleDeleteTodo, handleCompleteTodo,
}: Props) => {
  const [isChecked, setIsChecked] = useState<Todo['isCompleted']>(isCompleted);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState<boolean>(false);

  const handleDeleteConfirm = () => {
    setIsOpenDeleteConfirm(true);
  };

  const handleCheck = (e:ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setIsChecked(checked);
    handleCompleteTodo(id);
  };

  const handleCloseConfirmModal = () => {
    setIsOpenDeleteConfirm(false);
  };

  return (
    <li className="todo-item">
      <div className="todo-item-inner">
        <Checkbox checked={isChecked} onChange={handleCheck} />

        <div className="todo-item-info">
          <h3 className={clsx('todo-item-title', { 'todo-item-checked': isChecked })}>{title}</h3>
          {deadline && (
          <p className="todo-item-deadline">
            Дедлайн до
            {' '}
            {dayjs(deadline).locale('ru').format('D MMMM HH:mm')}
          </p>
          )}
        </div>
      </div>

      <button className="todo-item-button" onClick={handleDeleteConfirm}>
        close
      </button>

      {isOpenDeleteConfirm && (
        <ConfirmModal
          description="Вы уверены, что хотите удалить тудушку?"
          onClose={handleCloseConfirmModal}
          onSuccess={() => handleDeleteTodo(id)}
          payload={id}
          title="Удалить тудушку?"
        />
      )}
    </li>
  );
};

export default TodoItem;
