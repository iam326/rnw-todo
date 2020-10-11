import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddItemForm: React.FC<{
  value: string;
  handleChangeValue: (text: string) => void;
  handleAddItem: () => void;
}> = ({ value, handleChangeValue, handleAddItem }) => {
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleChangeValue}
        value={value}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
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
