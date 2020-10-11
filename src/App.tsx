import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import {
  RecoilRoot,
  useRecoilTransactionObserver_UNSTABLE,
  MutableSnapshot,
} from 'recoil';

import Header from './components/Header';
import TodoList from './components/TodoList';
import Store from './store';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="TODO リスト" />
      <TodoList style={styles.todoList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100vh',
  },
  todoList: {
    padding: 20,
    height: Dimensions.get('window').height - 56,
  },
});

const RecoilStatePersist: React.FC = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const modifiedAtom of (snapshot as any).getNodes_UNSTABLE({
      isModified: true,
    })) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      if (atomLoadable.state === 'hasValue') {
        localStorage.setItem(
          modifiedAtom.key,
          JSON.stringify({ value: atomLoadable.contents })
        );
      }
    }
  });
  return null;
};

const initializeState = (mutableSnapshot: MutableSnapshot) => {
  const item = localStorage.getItem(Store.Todo.todoList.key);
  if (item) {
    mutableSnapshot.set(Store.Todo.todoList, JSON.parse(item).value);
  }
};

const AppWrapper: React.FC = () => (
  <RecoilRoot initializeState={initializeState}>
    <RecoilStatePersist />
    <App />
  </RecoilRoot>
);

export default AppWrapper;
