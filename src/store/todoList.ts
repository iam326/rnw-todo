import { atom } from 'recoil';

export type TodoListItemProps = {
  createdAt: number;
  title: string;
  done: boolean;
};

export const todoList = atom<TodoListItemProps[]>({
  key: 'store/todoList',
  default: [],
});
