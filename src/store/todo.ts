import { atom } from 'recoil';

export type TodoItem = {
  createdAt: number;
  title: string;
  done: boolean;
};

export const todoList = atom<TodoItem[]>({
  key: 'store/todoList',
  default: [],
});
