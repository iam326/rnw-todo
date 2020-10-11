import { useState } from 'react';
import { useRecoilState } from 'recoil';

import Store from '../store';

const useTodo = () => {
  const [title, onChangeTitle] = useState(''); // これはここにあるべきか?
  const [todoList, setTodoList] = useRecoilState(Store.Todo.todoList);

  const handleAddItem = () => {
    if (title !== '') {
      setTodoList([...todoList, { createdAt: Date.now(), title, done: false }]);
      onChangeTitle('');
    }
  };

  const handleChangeState = (index: number, done: boolean) => {
    setTodoList([
      ...todoList.slice(0, index),
      { ...todoList[index], done },
      ...todoList.slice(index + 1),
    ]);
  };

  const handleUpdateItem = (index: number, text: string) => {
    setTodoList([
      ...todoList.slice(0, index),
      { ...todoList[index], title: text },
      ...todoList.slice(index + 1),
    ]);
  };

  const handleDeleteItem = (index: number) => {
    setTodoList([...todoList.slice(0, index), ...todoList.slice(index + 1)]);
  };

  return {
    title,
    handleAddItem,
    handleChangeState,
    onChangeTitle,
    handleUpdateItem,
    handleDeleteItem,
  };
};

export default useTodo;
