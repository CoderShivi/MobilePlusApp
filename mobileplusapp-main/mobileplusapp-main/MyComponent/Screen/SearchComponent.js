import {BackHandler,View, TextInput, TouchableOpacity,Dimensions} from 'react-native';
import React, {useState,useEffect} from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import DisplayAds from './DisplayAds';
const {width, height} = Dimensions.get('window');


export default function SearchComponent() {
  const [searchBox, setSearchBox] = useState('');
  const navigation = useNavigation();
  // useEffect(()=>{
  //   const backAction=()=>{
  //     navigation.goBack()
  //     return true;
  //   }
  //   const backHandler= BackHandler.addEventListener(
  //     'hardwareBackPress',
  //    backAction
  //   )
  // },[])
  return (
    <View>
      <View style={{backgroundColor: '#fff'}}>
        <View
          style={{backgroundColor: '#fff', width:width*0.8, alignSelf: 'center'}}>
          <TextInput
            autoFocus={true}
            selectionColor={'#FF3F6C'}
            placeholder="Search for brands & products"
            onChangeText={txt => setSearchBox(txt)}
            onSubmitEditing={() =>
              navigation.navigate('ProductListing', {pn: searchBox})
            }
            style={{padding: 15, fontSize: 16, fontWeight: '400'}}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectDrawer')}
          style={{position: 'absolute', top: 15, left: 15}}>
          <MCI name="arrow-left" size={30} />
        </TouchableOpacity>
        <TouchableOpacity  activeOpacity={0.7}
          onPress={() => navigation.navigate('ProductListing', {pn: searchBox})}
          style={{position: 'absolute', right: 20, top: 15}}>
          <FA name="search" color="#ff2459" size={30} />
        </TouchableOpacity>
      </View>
    <DisplayAds/>
      {/* <Featured /> */}
    </View>
  );
}