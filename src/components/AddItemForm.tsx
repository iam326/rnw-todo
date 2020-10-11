import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddItemForm: React.FC<{
  handleAddItem: (title: string) => void;
}> = ({ handleAddItem }) => {
  const [title, onChangeTitle] = useState('');
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeTitle}
        value={title}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddItem(title)}
      >
        <Text style={styles.addText}>追加</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  textInput: {
    flex: 1,
    paddingVertical: 6,
    fontSize: 24,
    borderColor: '#666',
    borderWidth: 1,
    marginRight: 10,
  },
  addButton: {
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90CAF9',
  },
  addText: {
    fontSize: 18,
  },
});

export default AddItemForm;
