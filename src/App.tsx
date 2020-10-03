import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

type ListItem = {
  id: string;
  title: string;
};

const DATA: ListItem[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>・ {title}</Text>
  </View>
);

const App: React.FC = () => {
  const renderItem: React.FC<{ item: ListItem }> = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
