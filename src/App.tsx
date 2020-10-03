import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
} from 'react-native';

type ListItem = {
  id: string;
  title: string;
};

const Item: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>・ {title}</Text>
  </View>
);

const App: React.FC = () => {
  const renderItem: React.FC<{ item: ListItem }> = ({ item }) => (
    <Item title={item.title} />
  );

  const [value, onChangeText] = useState('hoge');
  const [todoList, setTodoList] = useState<ListItem[]>([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
  ]);

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
                id: 'hoge',
                title: value,
              });
              setTodoList(list);
              onChangeText('');
            }
          }}
        />
      </View>
      <FlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
});

export default App;
