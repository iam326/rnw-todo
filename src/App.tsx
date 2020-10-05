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
};

const App: React.FC = () => {
  const [value, onChangeText] = useState('hoge');
  const [todoList, setTodoList] = useState<ListItem[]>([]);

  const renderItem: React.FC<{ item: ListItem; index: number }> = ({
    item,
    index,
  }) => (
    <View style={styles.item}>
      <CheckBox
        value={todoList[index].check}
        onValueChange={(value) => {
          const newTodoList = todoList.concat();
          newTodoList[index].check = value;
          setTodoList(newTodoList);
        }}
      />
      <Text style={styles.date}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View>
        {/* 横並びにする */}
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
              });
              setTodoList(list);
              onChangeText('');
            }
          }}
        />
        <Button
          title="DELETE"
          onPress={() => {
            const newTodoList = todoList.filter((todo) => !todo.check);
            setTodoList(newTodoList);
          }}
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
  textInput: {
    height: 40,
    paddingLeft: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  item: {
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 24,
  },
  date: {
    fontSize: 12,
  },
});

export default App;
