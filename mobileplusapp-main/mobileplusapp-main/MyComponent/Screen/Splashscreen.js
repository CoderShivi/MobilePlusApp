import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';

export default function Splashscreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginPage');
    }, 2000);
  }, []);

  return (
    <TouchableOpacity
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <View>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../Assets/splashlogo.png')}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}
