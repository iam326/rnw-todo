import { atom } from 'recoil';

export type TodoListItemProps = {
  createdAt: number;
  title: string;
  done: boolean;
};

export const list = atom<TodoListItemProps[]>({
  key: 'store/todoList',
  default: [],
});
