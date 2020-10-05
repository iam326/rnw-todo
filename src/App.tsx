import React, { useState } from 'react';
import {
  Button,
  CheckBox,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
      <View style={styles.header}>
        <Text style={styles.title}>TODO リスト</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
        <Button
          title="ADD"
          onPress={() => {
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
          disabled={value === ''}
        />
        <Button
          title="DELETE"
          onPress={() => {
            const newTodoList = todoList.filter((todo) => !todo.checked);
            setTodoList(newTodoList);
          }}
          disabled={todoList.every((todo) => !todo.checked)}
        />
      </View>
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 20,
  },
  textInput: {
    flexBasis: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
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
