import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' },
});

const App: React.FC = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>hello, world</Text>
    </View>
  );
};

export default App;
