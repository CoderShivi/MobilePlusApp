import React from 'react';
import {Text, View, Dimensions} from 'react-native';

export default function Strip() {
  const {width, height} = Dimensions.get('window');

  return (
    <View>
      <Text style={{backgroundColor: '#fff', height: height * 0.015}}></Text>
      <Text style={{backgroundColor: '#f1f2f3', height: height * 0.015}}></Text>
      <Text style={{backgroundColor: '#fff', height: height * 0.015}}></Text>
    </View>
  );
}
