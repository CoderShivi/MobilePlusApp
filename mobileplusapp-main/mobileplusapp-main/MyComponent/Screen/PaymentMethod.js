import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from 'react-native';
import React, {useState,useEffect} from 'react';
import moment from 'moment/moment'
const {width, height} = Dimensions.get('window');
import Ant from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import { ServerURL,getData,postData } from '../Services/FetchNodeServices';
export default function () {
  var myMoment = moment();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [orderId,setOrderId]=useState('')
  const [checked, setChecked] = useState('');
  const [refresh,setRefresh]=useState(false)
  const userDetailList = useSelector(state => state.userDetails);

  const productData = useSelector(state => state.product);
  const product = Object.values(productData);
  var newarr=product.map((item)=>(
    //console.log('hhhh',item.productid)
    {...item,orderstatus:'Home Delivery',notes: 'Cash On Delivery'}
    ))

  const addressData = useSelector(state => state.address);
  //alert(addressData.pincode)
  const pricesData = useSelector(state => state.prices) || [];

  pricesData.map(item => {
    console.log('gg====>', productData[item].quantity);
  });

  const finalPriceData = pricesData.reduce(
    (acc, item) => {
      //console.log(productData[item]);
      acc.mrp += Number(productData[item]?.price)*(productData[item]?.quantity ||1);
      acc.pricepaid += Number(productData[item]?.offerprice)*(productData[item]?.quantity ||1);
      return acc;
    },
    {mrp: 0, discount: 0, pricepaid: 0},
  );
  
const handleClickClearCart=()=>{
pricesData.map(item => {
  dispatch({
    type: 'REMOVE_PRODUCT',
    payload: item,
  });
});
  dispatch({ type: "REMOVE_PRICES" });
  setRefresh(!refresh)
}
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

  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: 'rzp_test_GQ6XaPC6gMPNwH',
    amount: finalPriceData?.pricepaid * 100,
    name: 'Mobile Plus',
    order_id: '', //Replace this with an order_id created using Orders API.
    prefill: {
      email: 'Mobile.Plus@example.com',
      contact: userDetailList?.mobileno,
      name: 'Mobile Plus',
    },
    theme: {color: '#ff3c6f'},
  };

  const SaveOrder = async (tid) => {

    var result = await getData('users/generateorderno');
   
  // console.log('ord',result[0]?.orderno+1)
    var body = pricesData.map((item)=>(
        {
     
          amount: finalPriceData?.mrp,
            amountpaid: finalPriceData?.pricepaid,
            covername: '',
            deliveryaddress:addressData?.address+','+addressData?.locality+','+addressData?.pincodeState+','+addressData?.state,
            
            deliverycharges: 0,
            deliverystatus: productData[item]?.displaystatus,
            discount: (finalPriceData?.mrp)-(finalPriceData?.pricepaid),
            emailaddress: userDetailList?.emailaddress,
            itc: '',
            lp: 0,
            mobileno: userDetailList?.mobileno,
            newloyaltypoints: 0,
            notes:'Online Payment',
            // orderdate:moment(new Date()).format("DD/MMM/YYYY "),
            orderdate:new Date(),
            orderno:"TMP"+result[0]?.orderno+1,
            orderstatus: productData[item]?.orderstatus,
            ordertime: moment(new Date()).format("h:mm a"),
            outletid: 5,
            price: finalPriceData?.mrp,
            productid: productData[item]?.productid,
            quantity: productData[item]?.quantity,
            status: 'Active',
          tid: tid,
      }
      ))

    //  console.log("response",body);
    var response = await postData('users/purchase', body);
    
   
    if (response.RESULT) {
      alert('order place successfully');
      navigation.navigate('ProjectDrawer');
      handleClickClearCart()
    } else {
      alert('order Not Save');
    }
  
  };

  const handleClickPlaceOrder = () => {
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        SaveOrder(data.razorpay_payment_id)
       // navigation.navigate('ProjectDrawer');
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };


  const PlaceOrder = async () => {
    if (checked == 'Pay Online') {
      handleClickPlaceOrder();
    } else {
      var result = await getData('users/generateorderno');
     
      
    // alert(JSON.stringify(result))
  //   console.log('ord',result[0]?.orderno+1)
      var body = pricesData.map((item)=>(
          {
       
            amount: finalPriceData?.mrp,
            amountpaid: finalPriceData?.pricepaid,
            covername: '',
            deliveryaddress:addressData?.address+','+addressData?.locality+','+addressData?.pincodeState+','+addressData?.state,
            
            deliverycharges: 0,
            deliverystatus: productData[item]?.displaystatus,
            discount: (finalPriceData?.mrp)-(finalPriceData?.pricepaid),
            emailaddress: userDetailList?.emailaddress,
            itc: '',
            lp: 0,
            mobileno: userDetailList?.mobileno,
            newloyaltypoints: 0,
            notes:productData[item]?.notes,
            // orderdate:moment(new Date()).format("DD/MMM/YYYY "),
            orderdate:new Date(),
            orderno:"TMP"+result[0]?.orderno+1,
            orderstatus: productData[item]?.orderstatus,
            ordertime: moment(new Date()).format("h:mm a"),
            outletid: 5,
            price: finalPriceData?.mrp,
            productid: productData[item]?.productid,
            quantity: productData[item]?.quantity,
            status: 'Active',
            tid: '',
        }
        ))
  
       // console.log("response",body);
      var response = await postData('users/purchase', body);
      
     
      if (response.RESULT) {
        alert('order place successfully');
       navigation.navigate('ProjectDrawer');
       handleClickClearCart()

      } else {
        alert('order Not Save');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15,
          backgroundColor: '#fff',
        }}>
        <Ant color="#282c3f" name="arrowleft" size={25} />

        <Text
          style={{
            fontFamily:'Lato-BoldItalic',
            color: '#424553',
            fontSize: 16,
            fontWeight: 600,
            marginLeft: 16,
          }}>
          SELECT ADDRESS
        </Text>
      </TouchableOpacity>
      <View style={{padding: 20}}>
        <Text style={{ color:'#94969f',fontFamily:'Lato-BoldItalic',fontSize: 12, fontWeight: 'bold'}}>
          RECOMMENDED PAYMENT OPTIONS
        </Text>
      </View>

      <View
        style={{
          height: height * 0.25,
          width: width * 1,
          backgroundColor: '#fff',
          //padding: 10,
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#f5f5f6',
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <RadioButton
              color="#FF3F6C"
              value="Cash On Delivery"
              status={checked == 'Cash On Delivery' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Cash On Delivery')}
            />
          </View>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 15, fontWeight: 'bold', color: '#000'}}>
            Cash On Delivery
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#f5f5f6',
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <RadioButton
              color="#FF3F6C"
              value="Pay Online"
              status={checked == 'Pay Online' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Pay Online')}
            />
          </View>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 15, fontWeight: 'bold', color: '#000'}}>
            Pay Online
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 50,
          height: height * 0.37,
          padding: 20,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            // marginTop:10,

            alignItems: 'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
            paddingBottom: 8,
            borderBottomColor: '#f5f5f6',
          }}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 12,
              fontWeight: 700,
              color: '#282c3f',
              letterSpacing: 0.8,
              paddingBottom: 15,
            }}>
            PRICE DETAILS (
            {Object.values(productData).length > 0
              ? Object.values(productData).length
              : 'NO'}{' '}
            Item)
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
            ₹
            {finalPriceData ? (
              <>{finalPriceData?.mrp?.toLocaleString()}</>
            ) : (
              '0'
            )}
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
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              color: '#ff3f6c',
              letterSpacing: 0.8,
            }}>
            Apply Coupon
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 15,
              fontWeight: 700,
              color: '#3e4152',
              letterSpacing: 0.8,
            }}>
            Total Amount
          </Text>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
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

      <View
        style={{
          marginTop: 'auto',
          backgroundColor: '#fff',
          padding: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.25,
        }}>
        <TouchableOpacity
          onPress={() => PlaceOrder()}
          style={{backgroundColor: '#FF3F6C', padding: 15}}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',alignSelf: 'center', fontWeight: 'bold', color: '#fff'}}>
            PAY NOW({finalPriceData?.pricepaid?.toLocaleString()})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
