import React, { useEffect } from 'react';
import Category from '../Screen/Category';
import Banner from '../Screen/Banner';
import HomeCard from '../Screen/HomeCard';
import {ScrollView, View,BackHandler,Alert, PermissionsAndroid} from 'react-native';
import GetSetGo from '../Screen/GetSetGo';
import TrendingBrand from '../Screen/TrendingBrand';
import Strip from '../Screen/Strip';
import BestSeller from '../Screen/BestSeller';
import BannerTwo from '../Screen/BannerTwo';
import MobileUnderFifteen from '../Screen/MobileUnderFifteen';
import MobileUnderTwenty from '../Screen/MobileUnderTwenty';
import DisplayAds from '../Screen/DisplayAds';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function Home({}) {
  const navigation=useNavigation()
 // const isFocused=useIsFocused()
  // useEffect(()=>{
  //   const backAction=()=>{
  //     navigation.replace('LoginPage')
  //     return true;
  //   }
  //   const backHandler= BackHandler.addEventListener(
  //     'hardwareBackPress',
  //    backAction
  //   )
  // },[])
   // useEffect(()=>{
  //   const backAction=()=>{
  //     Alert.alert('Stop','Are you sure want to exit app',[
  //       {
  //         text:"Cancel",
  //         onPress:()=>null,
  //         style:"cancel"
  //       },
  //       {
  //         text:"Yes",
  //         onPress:()=>BackHandler.exitApp()
  //       }

  //     ]);
  //     return true;
  //   }
  //   const backHandler= BackHandler.addEventListener(
  //     'hardwareBackPress',
  //    backAction
  //   )
  // },[])
  return (
     <ScrollView>
      
      <View style={{paddingTop:10}} >
        <Category />
      </View>
      <Strip />
<View>
        <Banner />
      </View>
      <Strip />
      <View>
        <BestSeller />
      </View>
      <Strip />
      <View>
        <BannerTwo />
      </View>
 <Strip />
      <View>
        <HomeCard />
      </View>
      <Strip />
      <View>
        <GetSetGo />
      </View>
      <Strip />
      <View>
        <MobileUnderFifteen />
      </View>
      <Strip />
      <View>
        <MobileUnderTwenty />
      </View>
      <Strip />
      <View>
        <TrendingBrand />
      </View>
      <Strip />
      <View>
        <DisplayAds />
      </View>

   
    </ScrollView> 

);
}
