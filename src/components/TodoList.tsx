import React, { useState } from 'react';
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native';
import { useRecoilState } from 'recoil';

import Form from './Form';
import TodoListItem from './TodoListItem';
import Store from '../store';
import { TodoItem } from '../store/todo';

type Props = {
  style?: ViewStyle;
};

const TodoList: React.FC<Props> = ({ style }) => {
  const [title, onChangeTitle] = useState('');
  const [todoList, setTodoList] = useRecoilState(Store.Todo.todoList);

  const renderItem: React.FC<{ item: TodoItem; index: number }> = ({
    item,
    index,
  }) => <TodoListItem item={item} index={index} />;

  return (
    <View style={style}>
      <Form
        value={title}
        handleChangeValue={onChangeTitle}
        handleAddItem={() => {
          if (title !== '') {
            setTodoList([
              ...todoList,
              { createdAt: Date.now(), title, done: false },
            ]);
            onChangeTitle('');
          }
        }}
      />
      <FlatList
        style={styles.list}
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.createdAt.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
});

export default TodoList;
