import React from 'react';
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native';
import { useRecoilValue } from 'recoil';

import AddItemForm from './AddItemForm';
import TodoListItem from './TodoListItem';
import useTodoList from '../hooks/useTodoList';

import Store from '../store';
import { TodoItem } from '../store/todoList';

type Props = {
  style?: ViewStyle;
};

const TodoList: React.FC<Props> = ({ style }) => {
  const {
    handleAddItem,
    handleUpdateItem,
    handleChangeState,
    handleDeleteItem,
  } = useTodoList();
  const todoList = useRecoilValue(Store.TodoList.todoList);

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
      <AddItemForm handleAddItem={handleAddItem} />
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
