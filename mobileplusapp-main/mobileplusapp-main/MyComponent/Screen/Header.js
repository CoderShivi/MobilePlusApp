import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Ant from 'react-native-vector-icons/AntDesign';
import Ent from 'react-native-vector-icons/Entypo';
import Smp from 'react-native-vector-icons/SimpleLineIcons';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import Ion from 'react-native-vector-icons/Ionicons';

import Input from './Input';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native'
export default function Header({}) {
  const productData = useSelector(state => state.product);
  const product = Object.values(productData);
  const navigation = useNavigation();

  const isFocused=useIsFocused()
useEffect(()=>{

},[isFocused])
  return (
    <View>
      <View
        style={{
          width: width,
          backgroundColor: '#fff',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Smp style={{fontWeight: 500}} name="menu" size={25} color={'#000'}
        onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />
        <TouchableOpacity  activeOpacity={0.7} onPress={()=>navigation.navigate('ProjectDrawer')}
          style={{
            paddingLeft: 5,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Image style={{resizeMode:'contain',width:width*0.4}} source={require('../Assets/mobile.png')} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row',alignItems:'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchComponent')}
            style={{paddingLeft: 5}}>
            <Ant name="search1" size={25} color={'#000'} />
          </TouchableOpacity>
          <View
            style={{
              paddingLeft: 20,
              fontWeight: 500,
            }}>
            <Ant name="hearto" size={25} color={'#000'} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Order')}
            style={{
              paddingLeft: 20,
              fontWeight: 500,
            }}>
            <Smp name="handbag" size={25} color={'#000'} />
            {product.length>0?(
              <View style={{position:'absolute',left:35,bottom:15,backgroundColor:'red',borderRadius:7,width:width*0.04,height:height*0.022,alignItems:'center'}}>
                <Text style={{fontFamily:'Lato-BoldItalic',fontSize:10,padding:0,color:'#fff',fontWeight:500}}>{product.length}</Text>
                </View>
            ):(<></>)}
            
          
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



























// import React,{useEffect,useState} from 'react'
// import { Text, View,Dimensions,TextInput, TouchableOpacity } from 'react-native'
// const {width, height} = Dimensions.get('window');
// import Ant from 'react-native-vector-icons/AntDesign';
// import Ent from 'react-native-vector-icons/Entypo';
// import Smp from 'react-native-vector-icons/SimpleLineIcons';
// import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ion from 'react-native-vector-icons/Ionicons';

// import Input from './Input';
// import { useNavigation } from '@react-navigation/native';

// export default function Header({}) {
//     const [searchBox,setSearchBox]=useState('')
//     const navigation=useNavigation()
  
//  const onSubmitted=()=>{
//   alert('hii')
//  }
  
//     return (
//     <View style={{backgroundColor:'#fff',width:width,height:height*0.07}}>
//       <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
//      <View style={{flexDirection:'row'}}>
     
//      <View style={{height:height*0.035,alignSelf:'center',flexDirection:'row'}}>

//           <Smp name="menu" size={18} color={'#000'} />

//      </View>
    
// <View style={{height:height*0.05, paddingLeft:5,alignSelf:'center',flexDirection:'row'}}>

// <Text style={{color:'#000',fontSize:20,textAlign:'center',paddingLeft:5,}}>
//     Myntra
//     </Text>
    
//     </View>
//     <View style={{width:width*0.45,height:height*0.05, paddingLeft:10,alignSelf:'center',flexDirection:'row'}}>
    
      
//        <TextInput 
//        value={searchBox} 
//        placeholder='Search  Product'
//        onChangeText={(txt)=>setSearchBox(txt)}
//        onSubmitEditing={() =>
//         navigation.navigate('ProductListing', {pn:searchBox})
//        }
//        />

   
//     </View>

// </View >
//       <View style={{flexDirection:'row'}}>
//       <TouchableOpacity
//        onPress={() =>
//         navigation.navigate('ProductListing', {pn:searchBox})
//       }
//           style={{ paddingLeft:5}}  >
//           <Ant name="search1" size={20} color={'#000'} />
//         </TouchableOpacity>
//         <View
//           style={{
//             paddingLeft:10
           
//           }}>
//           <Ant name="hearto" size={20} color={'#000'} />
//         </View>
//         <View
//           style={{
//             paddingLeft:10
//           }}>
//           <Smp name="handbag" size={20} color={'#000'} />
//         </View>
//     </View> 
//     </View>
    
    
    
//     </View>
//   )
// }
