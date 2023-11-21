/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore} from 'redux';
import RootReducer from './MyComponent/Storage/RootReducer';

const getReduxData = async () => {
  const data = await AsyncStorage.getItem('PURANADATA');
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
};
// const oldData = getReduxData();
var store = createStore(RootReducer /*,oldData == null ? undefined : oldData*/);
// store.subscribe(() => {
//   AsyncStorage.setItem('PURANADATA', JSON.stringify(store.getState()));
// });
import {Provider} from 'react-redux';
import RootNavigation from './MyComponent/Navigation/RootNavigation';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}

export default App;
