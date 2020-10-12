import React from 'react';
import {
  CheckBox,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRecoilValue } from 'recoil';

import Store from '../store';
import { TodoItem } from '../store/todoList';

type Props = {
  item: TodoItem;
  index: number;
  handleChangeState: (index: number, checked: boolean) => void;
  handleUpdateItem: (index: number, text: string) => void;
  handleDeleteItem: (index: number) => void;
};

const TodoListItem: React.FC<Props> = ({
  item,
  index,
  handleChangeState,
  handleUpdateItem,
  handleDeleteItem,
}) => {
  const todoList = useRecoilValue(Store.TodoList.todoList);

  return (
    <View style={styles.row}>
      <CheckBox
        value={todoList[index].done}
        onValueChange={(checked) => {
          handleChangeState(index, checked);
        }}
      />
      <View style={styles.content}>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
        <TextInput
          style={item.done ? [styles.textInput, styles.done] : styles.textInput}
          onChangeText={(text) => {
            handleUpdateItem(index, text);
          }}
          editable={true}
          value={todoList[index].title}
        />
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          handleDeleteItem(index);
        }}
      >
        <Text style={styles.deleteText}>x</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TodoListItem;
