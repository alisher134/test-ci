// libraries
import { useState } from 'react';
// components

import clsx from 'clsx';
import type { Sort } from '../App';

type Props = {
  className?: string;
  handleSortTodo: (sortType: Sort) => void;
};

const sortItems = [
  {
    id: 1,
    name: 'Все',
    type: 'all' as Sort,
  },
  {
    id: 2,
    name: 'Активные',
    type: 'active' as Sort,
  },
  {
    id: 3,
    name: 'Завершенные',
    type: 'complete' as Sort,
  },
];

const TodoSort = ({ className, handleSortTodo }: Props) => {
  const [activeSort, setActiveSort] = useState<number>(1);

  const handleSort = (sortId: number, sortType: Sort) => {
    handleSortTodo(sortType);
    setActiveSort(sortId);
  };

  return (
    <ul className={clsx('todo-sort', className)}>
      {sortItems.map((sort) => (
        <li key={sort.id} className={clsx('todo-sort-item', { 'todo-sort-item-active': sort.id === activeSort })}>
          <button className="todo-sort-button" onClick={() => handleSort(sort.id, sort.type)}>{sort.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoSort;
