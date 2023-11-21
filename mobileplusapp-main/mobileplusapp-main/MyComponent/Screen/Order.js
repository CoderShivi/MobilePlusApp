import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
  BackHandler
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ant from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import ENT from 'react-native-vector-icons/Entypo';
import ANT from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import AppButton from './AppButton';
import OrderCart from './OrderCart';
import {useDispatch, useSelector} from 'react-redux';
export default function Order() {
  const {width, height} = Dimensions.get('window');
  const productData = useSelector(state => state.product);
  const product = Object.values(productData);
  const userDetailList = useSelector(state => state.userDetails);
const [refresh,setRefresh]=useState(true)
  const pricesData = useSelector(state => state.prices) || [];
  // alert(pricesData)

  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  // pricesData.map(item => {
  //   console.log('====>', productData[item]);
  // });
  //const data = [pricesData]
  const finalPriceData = pricesData.reduce(
    (acc, item) => {
      //console.log(productData[item]);
      acc.mrp += Number(productData[item]?.price)*(productData[item]?.quantity ||1);
      acc.pricepaid += Number(productData[item]?.offerprice)*(productData[item]?.quantity ||1);
      return acc;
    },
    {mrp: 0, discount: 0, pricepaid: 0},
  );
const handleClickDeletePrice=()=>{
  //alert('hii')
  dispatch({ type: "REMOVE_PRICES" });
}
const handleClickRefresh=()=>{
setRefresh(!refresh)
}



  return (
    <>
      {product.length > 0 ? (
        <ScrollView style={{flex: 1}}>
       

          {/* <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{fontFamily:'Lato-BoldItalic',color: '#282c3f', fontSize: 14, letterSpacing: 0.5}}>
                  Deliver to:
                </Text>
                <Text
                  style={{
                    fontFamily:'Lato-BoldItalic',
                    color: '#282c3f',
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: 0.5,
                  }}>
                  Mukesh mahore
                </Text>
                <Text
                  style={{
                    fontFamily:'Lato-BoldItalic',
                    color: '#282c3f',
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: 0.5,
                  }}>
                  , 474012
                </Text>
              </View>

              <View style={{backgroundColor: '#fff'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily:'Lato-BoldItalic',
                    fontSize: 12,
                    color: '#282c3f',
                    width: width * 0.58,
                    letterSpacing: 0.5,
                  }}>
                  Subhash nagar a b road near Ganesh bagh infront of gaurav
                  filling station bahodapur , R R TOWER, Gwalior
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={{fontFamily:'Lato-BoldItalic',color: '#FF3F6C', fontWeight: 600, fontSize: 14}}>
                CHANGE
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{paddingRight: 5}}>
            <OrderCart handleClickRefresh={()=>handleClickRefresh()} handleClickDeletePrice={()=>handleClickDeletePrice()}  />
          </View>

          <View style={{padding: 15}}>
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#535766',
                fontSize: 15,
                fontWeight: 700,
                textTransform: 'uppercase',
                // paddingLeft: 16,
               // paddingTop: 16,
              }}>
              Coupons
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Coupons')}
            style={{
              padding: 15,
              // margin: 10,
              backgroundColor: '#fff',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MCI
                style={{color: '#282c3f', fontWeight: 700}}
                name="tag-outline"
                size={24}
              />
              <Text
                style={{
                  fontFamily:'Lato-BoldItalic',
                  color: '#282c3f',
                  fontSize: 14,
                  fontWeight: 700,
                  paddingLeft: 16,
                  letterSpacing: 0.8,
                }}>
                Apply Coupon
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MI
                style={{color: '#282c3f', fontWeight: 700}}
                name="keyboard-arrow-right"
                size={24}
              />
            </View>
          </TouchableOpacity>

          <View style={{padding: 20, backgroundColor: '#fff', marginTop: 10}}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                borderBottomWidth: 1,
                paddingBottom: 8,
                borderBottomColor: '#f5f5f6',
              }}>
              <Text
                style={{
                  fontFamily:'Lato-BoldItalic',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#282c3f',
                  letterSpacing: 0.8,
                }}>
                PRICE DETAILS ({pricesData.length>0?pricesData.length:'No'} Item)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                marginTop: 24,
              }}>
              <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing: 0.8, color:'#94969f'}}>Total MRP</Text>
              <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing: 0.8, color:'#94969f'}}>
                ₹{finalPriceData ? <>{finalPriceData?.mrp?.toLocaleString()}</> : '0'}
                {/* {finalPrice.mrp.toLocaleString()} */}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing: 0.8, color:'#94969f'}}>Discount on MRP</Text>
              <Text style={{fontFamily:'Lato-BoldItalic',color: '#03a685', letterSpacing: 0.8}}>
                -₹
                {finalPriceData ? (
                  <>
                    {(
                      finalPriceData?.mrp - finalPriceData?.pricepaid
                    )?.toLocaleString()}
                  </>
                ) : (
                  '0'
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
                borderBottomWidth: 1,
                borderBottomColor: '#f5f5f6',
                paddingBottom: 8,
              }}>
              <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing: 0.8, color:'#94969f'}}>Coupon Discount</Text>
              <TouchableOpacity
              onPress={() => navigation.navigate('Coupons')}>
              <Text
                style={{
                  fontFamily:'Lato-BoldItalic',
                  color: '#ff3f6c',
                  letterSpacing: 0.8,
                }}>
                Apply Coupon
              </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
               // marginBottom: 12,
              }}>
              <Text
                style={{
                  fontFamily:'Lato-BoldItalic',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#3e4152',
                  letterSpacing: 0.8,
                }}>
                Total Amount
              </Text>
              <Text
                style={{
                  fontFamily:'Lato-BoldItalic',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#3e4152',
                  letterSpacing: 0.8,
                }}>
                ₹
                {finalPriceData ? (
                  <>{finalPriceData?.pricepaid?.toLocaleString()}</>
                ) : (
                  '0'
                )}
                {/* {finalPrice.pricepaid.toLocaleString()} */}
              </Text>
            </View>
          </View>
          <View style={{
            paddingLeft:17,
            paddingRight:20,
            paddingBottom:20,
            backgroundColor: '#fff'}}>
          {Object.values(userDetailList).length?(
 <View>
{pricesData.length>0?(
 <AppButton
 onPress={()=>navigation.navigate('Addaddress')}
  borderRadii={5}
  btnWidth={0.92}
  buttonText={'PLACE ORDER'}
  bgcolor="#FF3F6C"
 />
):(
  <AppButton
 // onPress={()=>navigation.navigate('Addaddress')}
   borderRadii={5}
   btnWidth={0.92}
   buttonText={'Select Product'}
   bgcolor="#FF3F6C"
  />
)}


</View>
     
     ):(
            <AppButton
              

            onPress={()=>navigation.navigate('LoginPage')}
            borderRadii={5}
            btnWidth={0.92}
            buttonText={'LOG IN'}
            bgcolor="#FF3F6C"
          />
          )}
           
          </View>
        </ScrollView>
      ) : (
        <View style={{backgroundColor: '#fff', flex: 1}}>
         
          <View style={{alignSelf: 'center', paddingTop: 50}}>
            <Image
            resizeMode='contain'
              source={require('../Assets/empty-bag.webp')}
              style={{width: width * 1, height: height * 0.3}}
            />
          </View>

          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#000',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1,
                alignSelf: 'center',
              }}>
              Hey, it feels so light!
            </Text>

            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#7e818c',
                fontSize: 14,
                fontWeight: 500,
                paddingTop: 5,
              }}>
              There is nothing in your bag. Let's add some items.
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
