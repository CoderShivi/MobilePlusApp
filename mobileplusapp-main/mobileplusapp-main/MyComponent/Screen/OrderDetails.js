import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Father from 'react-native-vector-icons/Feather';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import ENTP from 'react-native-vector-icons/Entypo';
import {postData, ServerURL} from '../Services/FetchNodeServices';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
// import StarRating from 'react-native-star-rating';
import moment from 'moment/moment';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
export default function OrderDetails({route}) {
 // console.log(route.params.ordid);
 const ShimmerPlaceorder = createShimmerPlaceholder(LinearGradient);

  const navigation = useNavigation();
  var myMoment = moment();
  const [loading, setLoading] = useState(false);
 
  const [allOrderDetails, setAllOrderDetails] = useState([]);
  const fetchAllOrder = async () => {
    setLoading(true);
    var result = await postData('purchase/orderdetailsbyorderno', {
      orderno: route.params.ordid,
    });
  // alert(JSON.stringify(result))
    if (result) {
      setAllOrderDetails(result);
    } else {
      alert('Server Error');
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAllOrder();
  }, []);
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
  const handleCancelOrder = async () => {
    // alert(JSON.stringify(allOrderDetails))
  // console.log('check status',allOrderDetails[0].status)
    let body = {
      status: allOrderDetails[0].status,
      orderno: allOrderDetails[0].orderno,
      loyaltypoints: allOrderDetails[0].loyaltypoints,
      mobileno: allOrderDetails[0].mobileno,
    };
//console.log(body)
    var list = await postData('purchase/cancelorder', body);
    if (list.result) {
      alert(
        ` Your order has been cancelled ID ${
          allOrderDetails[0].orderno
        }. Your refund initiated ASAP. The Mobile Plus`,
      );
    }
    navigation.navigate('ProjectDrawer');
    
  };
//  console.log('check status 1',allOrderDetails[0]?.status)



  const OrderDetailsPage = ({item}) => (
    <View
      style={{
        borderBottomWidth: 1,
         borderBottomColor: 'rgba(40,44,63,0.10)',
         width:width,
         height:height*0.25,
         padding: 15,
         backgroundColor:'#fff',
flexDirection:'column'
         }}>
      <View
        style={{
        
          flexDirection: 'row',
        
        }}>
        
           <View style={{
            width:width*0.2,
            height:height*0.16,
            backgroundColor:'#fff',}}>
          <Image
            resizeMode="contain"
            style={{width: width*0.2,  height:height*0.14}}
            source={{uri: `${ServerURL}/images/${item.picture}`}}
          />
        </View>
       
   
        <View style={{ width:width*0.72,
          height:height*0.16,
          backgroundColor:'#fff',
          paddingLeft:12}}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily:'Lato-BoldItalic',
              color: '#000',
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: 0.3,
              width: width * 0.7,
            }}>
            {item.productname}
          </Text>
          {/* <Text
            style={{
              fontFamily:'Lato-BoldItalic',
              fontSize: 12,
              marginTop: 5,
              fontWeight: 500,
              letterSpacing: 0.3,
            }}>
            Amount ₹ {item.amount}
          
          </Text>
          <Text
            style={{
              fontFamily:'Lato-BoldItalic',
              fontSize: 12,
              marginTop: 5,
              fontWeight: 500,
              letterSpacing: 0.3,
            }}>
            Discount ₹ {item.discount}
          </Text> */}
          <Text
            style={{
              fontFamily:'Lato-BoldItalic',
              fontSize: 12,
              marginTop: 5,
              fontWeight: 500,
              letterSpacing: 0.3,
              color:'#94969f'
            }}>
            {item.quantity}&nbsp;Quantity 
          </Text>
          <Text
            style={{
              fontFamily:'Lato-BoldItalic',
              letterSpacing: 0.5,
              color: '#000',
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            ₹{(item.amount)-(item.discount)}
          </Text>
          <Text style={{paddingTop:5,fontFamily:'Lato-BoldItalic',fontSize: 14, fontWeight: "bold", color: '#000'}}>
          Order Confirmed on {moment(item.orderdate).format('DD-MMM-YYYY ')}
        </Text>
         
        </View>
       


      </View>

    <View >
      <Text style={{fontWeight:600, color:'#94969f'}}>Shipping Fee: ₹3</Text>
      <Text style={{fontWeight:600, color:'#94969f'}}>Shipping Discount: ₹3</Text>
    </View>
   
   
    </View>
  );

  return (
    <View style={{flex: 1}}>
   {loading?(
    <ScrollView style={{flexDirection: 'column', width: width * 1,backgroundColor:'#fff'}}>
          <View style={{flexDirection:'row'}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.15,
                  //borderRadius: 50,
                }}
              />
            </View>
                  <View style={{flexDirection:'column'}}>
            <View
              style={{width: width * 0.60, height: height * 0.035, padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.60,
                  height: height * 0.03,
                  borderRadius: 2,
                  
                }}
              />
            </View>
            <View
              style={{width: width * 0.45, height: height * 0.035, marginTop:15,padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.45,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            <View
              style={{width: width * 0.3, height: height * 0.035, padding: 10,marginLeft:20,marginTop:15}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.3,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            </View>
          </View>

          <View style={{flexDirection:'row',marginTop:20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.15,
                  //borderRadius: 50,
                }}
              />
            </View>
                  <View style={{flexDirection:'column'}}>
            <View
              style={{width: width * 0.60, height: height * 0.035, padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.60,
                  height: height * 0.03,
                  borderRadius: 2,
                  
                }}
              />
            </View>
            <View
              style={{width: width * 0.45, height: height * 0.035, marginTop:15,padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.45,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            <View
              style={{width: width * 0.3, height: height * 0.035, padding: 10,marginLeft:20,marginTop:15}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.3,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.15,
                  //borderRadius: 50,
                }}
              />
            </View>
                  <View style={{flexDirection:'column'}}>
            <View
              style={{width: width * 0.60, height: height * 0.035, padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.60,
                  height: height * 0.03,
                  borderRadius: 2,
                  
                }}
              />
            </View>
            <View
              style={{width: width * 0.45, height: height * 0.035, marginTop:15,padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.45,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            <View
              style={{width: width * 0.3, height: height * 0.035, padding: 10,marginLeft:20,marginTop:15}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.3,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.15,
                  //borderRadius: 50,
                }}
              />
            </View>
                  <View style={{flexDirection:'column'}}>
            <View
              style={{width: width * 0.60, height: height * 0.035, padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.60,
                  height: height * 0.03,
                  borderRadius: 2,
                  
                }}
              />
            </View>
            <View
              style={{width: width * 0.45, height: height * 0.035, marginTop:15,padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.45,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            <View
              style={{width: width * 0.3, height: height * 0.035, padding: 10,marginLeft:20,marginTop:15}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.3,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.15,
                  //borderRadius: 50,
                }}
              />
            </View>
                  <View style={{flexDirection:'column'}}>
            <View
              style={{width: width * 0.60, height: height * 0.035, padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.60,
                  height: height * 0.03,
                  borderRadius: 2,
                  
                }}
              />
            </View>
            <View
              style={{width: width * 0.45, height: height * 0.035, marginTop:15,padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.45,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            <View
              style={{width: width * 0.3, height: height * 0.035, padding: 10,marginLeft:20,marginTop:15}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.3,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            </View>
          </View>

          <View style={{flexDirection:'row',marginTop:20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.15,
                  //borderRadius: 50,
                }}
              />
            </View>
                  <View style={{flexDirection:'column'}}>
            <View
              style={{width: width * 0.60, height: height * 0.035, padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.60,
                  height: height * 0.03,
                  borderRadius: 2,
                  
                }}
              />
            </View>
            <View
              style={{width: width * 0.45, height: height * 0.035, marginTop:15,padding: 10,marginLeft:20}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.45,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            <View
              style={{width: width * 0.3, height: height * 0.035, padding: 10,marginLeft:20,marginTop:15}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.3,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
            </View>
          </View>
        </ScrollView>
   ):(
<View>
   <ScrollView>
        <View style={{backgroundColor: '#fff'}}>
          <View
            style={{
              padding: 20,
              borderBottomColor: 'rgba(40,44,63,0.10)',
              borderBottomWidth: 1,
            }}>
            <Text style={{ color:'#94969f',fontFamily:'Lato-BoldItalic',letterSpacing: 0.3,fontWeight:'bold'}}>
              Order ID-{route.params.ordid}
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            //   horizontal={true}
            showsVerticalScrollIndicator={true}
            data={allOrderDetails}
            renderItem={({item}) => <OrderDetailsPage item={item} />}
            keyExtractor={item => item.orderno}
          />

   
</View>
      </ScrollView>
      <View style={{backgroundColor:'#fff',padding:10,alignItems:'center'}} >

      {allOrderDetails[0]?.status != 'Delivered' &&
    allOrderDetails[0]?.status != 'Cancel Order' ? (
      <TouchableOpacity  style={{backgroundColor:'#ff3c6f',width:width*0.8,padding:10,borderRadius:20}}
      onPress={() => handleCancelOrder()}
      >
          
         
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#FFF',
                //padding: 5,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                //width: width * 0.55,
              }}>
              Cancel Order
            </Text>
        
        
        </TouchableOpacity>
      ) : (
        <View><Text style={{fontFamily:'Lato-BoldItalic',fontSize:16,fontWeight:'bold',padding:10}}>Order Cancelled</Text></View>
      )}
    
         
          </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Bill',{orderid:allOrderDetails[0]?.orderno})}
          style={{
            marginTop: 10,
            backgroundColor: '#fff',
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ENTP color="blue" size={20} name="text-document-inverted" />
            <Text
              style={{
                fontFamily:'Lato-BoldItalic',
                color: '#000',
                fontSize: 16,
                fontWeight: '500',
                marginLeft: 10,
              }}>
              Invoice download
            </Text>
          </View>
          <ENTP color="#000" size={25} name="chevron-small-right" />
        </TouchableOpacity>
    
        </View> )}
    </View>
  );
}
