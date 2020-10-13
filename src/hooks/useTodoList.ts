import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import Store from '../store';

const useTodoList = () => {
  const [todoList, setTodoList] = useRecoilState(Store.TodoList.data);

  const handleAddItem = useCallback(
    (title: string) => {
      if (title !== '') {
        setTodoList([
          { createdAt: Date.now(), title, done: false },
          ...todoList,
        ]);
      }
    },
    [todoList, setTodoList]
  );

  const handleChangeState = useCallback(
    (index: number, done: boolean) => {
      setTodoList([
        ...todoList.slice(0, index),
        { ...todoList[index], done },
        ...todoList.slice(index + 1),
      ]);
    },
    [todoList, setTodoList]
  );

  const handleUpdateItem = useCallback(
    (index: number, text: string) => {
      setTodoList([
        ...todoList.slice(0, index),
        { ...todoList[index], title: text },
        ...todoList.slice(index + 1),
      ]);
    },
    [todoList, setTodoList]
  );

  const handleDeleteItem = useCallback(
    (index: number) => {
      setTodoList([...todoList.slice(0, index), ...todoList.slice(index + 1)]);
    },
    [todoList, setTodoList]
  );

  return {
    handleAddItem,
    handleChangeState,
    handleUpdateItem,
    handleDeleteItem,
  };
};

export default useTodoList;
