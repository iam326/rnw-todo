import { atom } from 'recoil';

export type TodoItem = {
  timestamp: number;
  body: string;
  checked: boolean;
};

export const todoList = atom<TodoItem[]>({
  key: 'store/todoList',
  default: [],
});
