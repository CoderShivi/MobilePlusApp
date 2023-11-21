import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler
} from 'react-native';
import React, {useState,useEffect} from 'react';
import AppButton from './AppButton';
import Atd from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
export default function Coupons() {
  const {width, height} = Dimensions.get('window');
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation()
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
  const CouponItem = [
    {
      id: '1',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
    {
      id: '2',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
    {
      id: '3',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
    {
      id: '4',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
    {
      id: '5',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
    {
      id: '6',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
    {
      id: '7',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
    {
      id: '8',
      couponname: 'MYNTRA200',
      description: '20% off on minimum purchase of Rs.1899.',
      off: '₹Save200',
      expdate: '12th April 2023',
      exptime: '5:00 PM',
    },
  ];
  
  const Item = ({item}) => (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          alignItems: 'center',
          marginTop: 25,
        }}>
        <CheckBox
          tintColors={{true: '#FF3F6C', false: 'black'}}
          disabled={false}
          value={isSelected}
          onValueChange={setSelection}
        />

        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#FF3F6C',
            borderRadius: 3,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontFamily:'Lato-BoldItalic',
              paddingLeft: 12,
              paddingTop: 12,
              paddingBottom: 12,
              paddingRight: 12,
              color: '#FF3F6C',
            }}>
            {item.couponname}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginLeft: width * 0.1,
          backgroundColor: '#fff',
          padding: 12,
        }}>
        <Text
          style={{
            fontFamily:'Lato-BoldItalic',
            color: '#282c3f',
            fontWeight: 700,
            fontSize: 15,
            paddingTop: 5,
            letterSpacing: 1.8,
            lineHeight: 30,
          }}>
          {item.off}
        </Text>
        <Text style={{fontFamily:'Lato-BoldItalic',lineHeight: 25, letterSpacing: 1.5}}>
          {item.description}
        </Text>
        <Text style={{fontFamily:'Lato-BoldItalic',lineHeight: 25, letterSpacing: 1.5}}>
          Expires on:{item.expdate}
          <Text
            style={{
              fontFamily:'Lato-BoldItalic',
              color: 'rgb(148, 150, 159)',
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            |
          </Text>
          {item.exptime}
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{padding: 15, flex: 1}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            alignItems: 'center',
          }}
          activeOpacity={0.7}
          >
          <Atd color="#282c3f" name="arrowleft" size={24} />
          <Text
            style={{
              fontFamily:'Lato-BoldItalic',
              marginLeft: 15,
              color: '#282c3f',
              fontWeight: 600,
              fontSize: 21,
            }}>
            COUPONS
          </Text>
        </TouchableOpacity>
        <View
          style={{
            paddingTop: 15,
            borderBottomWidth: 0.5,
            opacity: 1,
            alignSelf: 'center',
            width: width,
            borderBottomColor: 'rgb(148, 150, 159)',
          }}
        />
        <View style={{marginTop: height * 0.03}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 0.5,
              borderRadius: 3,
              borderColor: '#FF3F6C',
              margin: 10,
              backgroundColor: '#fff',
            }}>
            <TextInput
            selectionColor={'#FF3F6C'}
              style={{paddingLeft: 10, color: '#424242', padding: 0}}
              placeholder="Enter coupon code"
            />
            <TouchableOpacity style={{padding: 12}}  activeOpacity={0.7}>
              <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing: 2,color:'#FF3F6C'}}>CHECK</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={CouponItem}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
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
        <View style={{paddingLeft:0}}>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 12, fontWeight: 500}}>
            Maximum savings :
          </Text>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 12, fontWeight: 500}}>&#x20b9;&nbsp;200</Text>
        </View>
       
        <View style={{paddingBottom:5}}>
         <AppButton borderRadii={0.1} btnWidth={0.5} buttonText={'APPLY'} bgcolor='#FF3F6C'  />
         </View>
      
      </View>
    </View>
    </View>
  );
}
