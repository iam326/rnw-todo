import { atom } from 'recoil';

export type TodoListItemProps = {
  createdAt: number;
  title: string;
  done: boolean;
};

export const data = atom<TodoListItemProps[]>({
  key: 'store/todoList',
  default: [],
});
