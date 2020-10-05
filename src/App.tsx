import React, { useState } from 'react';
import {
  CheckBox,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Header from './components/Header';
import Form from './components/Form';

type TodoItem = {
  timestamp: number;
  body: string;
  checked: boolean;
  editable: boolean;
};

const App: React.FC = () => {
  const [value, onChangeText] = useState('hoge');
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const renderItem: React.FC<{ item: TodoItem; index: number }> = ({
    item,
    index,
  }) => (
    <View style={styles.row}>
      <CheckBox
        style={styles.checkbox}
        value={todoList[index].checked}
        onValueChange={(value) => {
          const newTodoList = todoList.concat();
          newTodoList[index].checked = value;
          setTodoList(newTodoList);
        }}
      />
      <View>
        <Text style={styles.date}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
        <TextInput
          style={styles.body}
          onChangeText={(text) => {
            const newTodoList = todoList.concat();
            newTodoList[index].body = text;
            setTodoList(newTodoList);
          }}
          onFocus={() => {
            const newTodoList = todoList.concat();
            newTodoList[index].editable = true;
            setTodoList(newTodoList);
          }}
          onBlur={() => {
            const newTodoList = todoList.concat();
            newTodoList[index].editable = false;
            setTodoList(newTodoList);
          }}
          editable={todoList[index].editable}
          value={todoList[index].body}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Header title="TODO リスト" />
      <Form
        value={value}
        handleChangeValue={onChangeText}
        handleAddItem={() => {
          if (value !== '') {
            const list = todoList.concat();
            list.push({
              timestamp: Date.now(),
              body: value,
              checked: false,
              editable: false,
            });
            setTodoList(list);
            onChangeText('');
          }
        }}
        handleDeleteItem={() => {
          const newTodoList = todoList.filter((todo) => !todo.checked);
          setTodoList(newTodoList);
        }}
      />
      <FlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 20,
  },
  body: {
    fontSize: 24,
  },
  date: {
    fontSize: 12,
  },
});

export default App;
