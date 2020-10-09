import React, { useState } from 'react';
import {
  CheckBox,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from './components/Header';
import Form from './components/Form';

type TodoItem = {
  timestamp: number;
  body: string;
  checked: boolean;
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
          const newTodoList = todoList.slice();
          newTodoList[index].checked = value;
          setTodoList(newTodoList);
        }}
      />
      <View style={styles.todoBody}>
        <Text style={styles.date}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
        <TextInput
          style={
            item.checked ? [styles.textInput, styles.done] : styles.textInput
          }
          onChangeText={(text) => {
            const newTodoList = todoList.slice();
            newTodoList[index].body = text;
            setTodoList(newTodoList);
          }}
          editable={true}
          value={todoList[index].body}
        />
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          const list = todoList.slice();
          list.splice(index, 1);
          setTodoList(list);
        }}
      >
        <Text style={styles.closeText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView scrollEnabled={true}>
        <Header title="TODO リスト" />
        <View style={styles.content}>
          <Form
            value={value}
            handleChangeValue={onChangeText}
            handleAddItem={() => {
              if (value !== '') {
                const list = todoList.slice();
                list.push({
                  timestamp: Date.now(),
                  body: value,
                  checked: false,
                });
                setTodoList(list);
                onChangeText('');
              }
            }}
          />
          <FlatList
            data={todoList}
            renderItem={renderItem}
            keyExtractor={(item) => item.timestamp.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100vh',
  },
  content: {
    padding: 20,
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
  checkbox: {},
  todoBody: {
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
  closeButton: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#666',
  },
});

export default App;
