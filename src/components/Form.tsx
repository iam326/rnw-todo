import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const Form: React.FC<{
  value: string;
  handleChangeValue: (text: string) => void;
  handleAddItem: () => void;
  handleDeleteItem: () => void;
}> = ({ value, handleChangeValue, handleAddItem, handleDeleteItem }) => {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleChangeValue}
        value={value}
      />
      <Button title="ADD" onPress={handleAddItem} disabled={value === ''} />
      <Button
        title="DELETE"
        onPress={handleDeleteItem}
        //disabled={todoList.every((todo) => !todo.checked)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Form;
