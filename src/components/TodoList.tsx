import React, { useState } from 'react';
import {
  CheckBox,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useRecoilState } from 'recoil';

import Form from './Form';
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
  }) => (
    <View style={styles.row}>
      <CheckBox
        value={todoList[index].done}
        onValueChange={(checked) => {
          setTodoList([
            ...todoList.slice(0, index),
            { ...todoList[index], done: checked },
            ...todoList.slice(index + 1),
          ]);
        }}
      />
      <View style={styles.content}>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
        <TextInput
          style={item.done ? [styles.textInput, styles.done] : styles.textInput}
          onChangeText={(text) => {
            setTodoList([
              ...todoList.slice(0, index),
              { ...todoList[index], title: text },
              ...todoList.slice(index + 1),
            ]);
          }}
          editable={true}
          value={todoList[index].title}
        />
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setTodoList([
            ...todoList.slice(0, index),
            ...todoList.slice(index + 1),
          ]);
        }}
      >
        <Text style={styles.deleteText}>x</Text>
      </TouchableOpacity>
    </View>
  );

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
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  content: {
    marginHorizontal: 20,
    flex: 1,
  },
  textInput: {
    paddingVertical: 6,
    fontSize: 24,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  deleteButton: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#666',
  },
});

export default TodoList;
