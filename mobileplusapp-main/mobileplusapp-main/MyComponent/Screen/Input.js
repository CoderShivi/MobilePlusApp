import React from 'react';
import {
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default function Input({mrgT, labelText, setValue, iconName, ...props}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: '#bfc0c6',
        backgroundColor: '#fff',
        marginTop: mrgT ? mrgT : 0,
        padding: 8
      }}>
      <TextInput
        {...props}
        selectionColor={'#FF3F6C'}
        style={{paddingLeft: 10, color: '#424242', padding: 0,width:width,fontSize:14}}
      />
      {/* <TouchableOpacity style={{padding: 12}}>
        <Text style={{letterSpacing: 2, color: '#FF3F6C'}}>
          CHECK
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}
