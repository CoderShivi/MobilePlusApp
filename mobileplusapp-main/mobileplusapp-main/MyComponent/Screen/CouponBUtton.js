import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import AppButton from './AppButton';
const {width, height} = Dimensions.get('window');

export default function CouponBUtton({props}) {
  return (
    <View
      style={{
        marginTop: 8,
        elevation: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,

          backgroundColor: '#fff',
        }}>
        <View style={{}}>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 12, fontWeight: 500}}>
            Maximum savings :
          </Text>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 12, fontWeight: 500}}>&#x20b9;&nbsp;200</Text>
        </View>
         <AppButton borderRadii={0.1} btnWidth={0.5} buttonText={'APPLY'} bgcolor='red'  />

      </View>
    </View>
  );
}
