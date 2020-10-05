import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default Header;
