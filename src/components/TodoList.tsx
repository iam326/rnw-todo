import React from 'react';
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native';
import { useRecoilValue } from 'recoil';

import Form from './Form';
import TodoListItem from './TodoListItem';
import useTodo from '../hooks/useTodoList';

import Store from '../store';
import { TodoItem } from '../store/todo';

type Props = {
  style?: ViewStyle;
};

const TodoList: React.FC<Props> = ({ style }) => {
  const {
    title,
    handleAddItem,
    handleUpdateItem,
    onChangeTitle,
    handleChangeState,
    handleDeleteItem,
  } = useTodo();
  const todoList = useRecoilValue(Store.Todo.todoList);

  const renderItem: React.FC<{ item: TodoItem; index: number }> = ({
    item,
    index,
  }) => (
    <TodoListItem
      item={item}
      index={index}
      handleChangeState={handleChangeState}
      handleUpdateItem={handleUpdateItem}
      handleDeleteItem={handleDeleteItem}
    />
  );

  return (
    <View style={style}>
      <Form
        value={title}
        handleChangeValue={onChangeTitle}
        handleAddItem={handleAddItem}
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
