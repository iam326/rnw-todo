import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  CheckBox,
} from 'react-native';

type ListItem = {
  timestamp: number;
  title: string;
  check: boolean;
  update: boolean;
};

const App: React.FC = () => {
  const [value, onChangeText] = useState('hoge');
  const [todoList, setTodoList] = useState<ListItem[]>([]);

  const renderItem: React.FC<{ item: ListItem; index: number }> = ({
    item,
    index,
  }) => (
    <View style={styles.row}>
      <CheckBox
        style={styles.checkbox}
        value={todoList[index].check}
        onValueChange={(value) => {
          const newTodoList = todoList.concat();
          newTodoList[index].check = value;
          setTodoList(newTodoList);
        }}
      />
      <View>
        <Text style={styles.date}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
        <TextInput
          style={styles.title}
          onChangeText={(text) => {
            const newTodoList = todoList.concat();
            newTodoList[index].title = text;
            setTodoList(newTodoList);
          }}
          onFocus={() => {
            const newTodoList = todoList.concat();
            newTodoList[index].update = true;
            setTodoList(newTodoList);
          }}
          onBlur={() => {
            const newTodoList = todoList.concat();
            newTodoList[index].update = false;
            setTodoList(newTodoList);
          }}
          editable={todoList[index].update}
          value={todoList[index].title}
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
                title: value,
                check: false,
                update: false,
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
            const newTodoList = todoList.filter((todo) => !todo.check);
            setTodoList(newTodoList);
          }}
          disabled={todoList.every((todo) => !todo.check)}
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
  title: {
    fontSize: 24,
  },
  date: {
    fontSize: 12,
  },
});

export default App;
