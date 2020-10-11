import { useRecoilState } from 'recoil';

import Store from '../store';

const useTodoList = () => {
  const [todoList, setTodoList] = useRecoilState(Store.Todo.todoList);

  const handleAddItem = (title: string) => {
    if (title !== '') {
      setTodoList([...todoList, { createdAt: Date.now(), title, done: false }]);
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
    handleAddItem,
    handleChangeState,
    handleUpdateItem,
    handleDeleteItem,
  };
};

export default useTodoList;
