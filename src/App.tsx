import React, { useState } from 'react';
import {
  CheckBox,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RecoilRoot, useRecoilState } from 'recoil';

import Header from './components/Header';
import Form from './components/Form';
import { Todo } from './store';
import { TodoItem } from './store/todo';

const App: React.FC = () => {
  const [title, onChangeTitle] = useState('');
  const [todoList, setTodoList] = useRecoilState(Todo.todoList);

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
      <View style={styles.todoBody}>
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
        style={styles.closeButton}
        onPress={() => {
          setTodoList([
            ...todoList.slice(0, index),
            ...todoList.slice(index + 1),
          ]);
        }}
      >
        <Text style={styles.closeText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <Header title="TODO リスト" />
      <View style={styles.content}>
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
          style={styles.todoList}
          data={todoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.createdAt.toString()}
        />
      </View>
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
    height: Dimensions.get('window').height - 56,
  },
  todoList: {
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

const AppWrapper: React.FC = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

export default AppWrapper;
