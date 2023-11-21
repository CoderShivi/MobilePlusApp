import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from 'react-native';
import moment from 'moment/moment';

import React, {useEffect, useState} from 'react';
import MI from 'react-native-vector-icons/MaterialIcons';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');
import Ant from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {ServerURL, getData, postData} from '../Services/FetchNodeServices';
import {TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
export default function DisplayOrder() {
  var myMoment = moment();
  const ShimmerPlaceorder = createShimmerPlaceholder(LinearGradient);

  const navigation = useNavigation();
  const userDetailList = useSelector(state => state.userDetails);
  const [loading, setLoading] = useState(false);
  const [allOrder, setAllOrder] = useState([]);
  const [fltr,setFltr]=useState([])
  const [searchOrder,setSearchOrder]=useState('')

  const fetchAllOrder = async () => {
    setLoading(true);
    var result = await postData('purchase/orderdisplaybymobileno', {
      mobileno: userDetailList.mobileno,
    });
    // alert(JSON.stringify(result))
    if (result) {
      setAllOrder(result);
      setFltr(result)
    } else {
      alert('Server Error');
    }
  setLoading(false)
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
  const handleClickSearchOrder=()=>{
//alert(searchOrder)
    var re= fltr.filter((item)=>{
      return item.orderno .includes(searchOrder) 
    })
    setAllOrder(re)
   } 
  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetails', {ordid: item.orderno})}
      style={{
        borderRadius: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(40,44,63,0.10)',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        width: width * 0.94,
        height: height * 0.122,
        padding: 20,
        justifyContent: 'space-between',

        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
      }}>
      <View>
        <Text style={{fontSize: 12, color: 'blue'}}>Order No</Text>
        <Text style={{fontSize: 10, color: '#000'}}>{item.orderno}</Text>
        <Text style={{fontSize: 10, color: '#000'}}>
          {moment(item.orderdate).format('DD-MMM-YYYY ')}
        </Text>
      </View>

      <View>
        <Text style={{fontSize: 12, color: 'blue'}}>Amount</Text>
        <Text style={{fontSize: 10, color: '#000'}}>{item.amountpaid}</Text>
        <Text
          style={{
            fontSize: 10,
            color: item.status == 'Cancel Order' ? 'red' : 'green',
          }}>
          {item.status == 'Cancel Order' ? 'Cancelled' : item.status}
        </Text>
      </View>
      {/* <View
        style={{
          width: width,
          height: height * 0.2,
          padding: 10,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
           // marginTop: 15,
            alignItems: 'center',
          }}>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 14, fontWeight: 'bold', color: '#000'}}>
          Order Place On
          </Text>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 13, fontWeight: 'bold', color: '#000'}}>
          {moment(item.orderdate).format("DD-MMM-YYYY ")}at {item.ordertime}
          </Text>
        
        </View>
        <View style={{flexDirection:'row',
              justifyContent:'space-between',marginTop: 10}}>
          <Text
           
            style={{
              fontFamily:'Lato-BoldItalic',
              color: '#000',
              fontSize: 13,
              fontWeight:'bold',
              marginTop: 5,
            }}>
            Total Amount Paid
            
           
          </Text>
          <Text style={{fontFamily:'Lato-BoldItalic',fontWeight:'bold'}}>
          &#8377; {item.amountpaid}
          </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
          <Text
          
            style={{
              fontFamily:'Lato-BoldItalic',
              color: '#000',
              fontSize: 13,
              fontWeight:'bold',
              marginTop: 5,
            }}>
            Order No
           
        
          </Text>
          <Text style={{fontFamily:'Lato-BoldItalic',fontWeight:'bold'}}>
          {item.orderno}
          </Text>
        </View>

        <View style={{marginTop: 10,flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontFamily:'Lato-BoldItalic',color: 'blue', fontSize: 13,
              fontWeight:'bold',}}>Delevery status</Text>
          <Text style={{fontFamily:'Lato-BoldItalic',fontWeight:'bold'}}>{item.status}</Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
          <View style={{backgroundColor: '#f1f3f3', padding: 10}}>
          <View
            style={{
              backgroundColor: '#fff',
              width: width * 0.9,
              alignSelf: 'center',
              borderWidth: 0.5,
              borderRadius: 3,
              borderColor: 'rgba(40,44,63,0.10)',
            }}>
            <TextInput
            onChangeText={(txt)=>setSearchOrder(txt)}
            onKeyPress={()=>handleClickSearchOrder()}
              // autoFocus={true}
              //selectionColor={'#FF3F6C'}
              placeholderTextColor={ '#94969f'}
              placeholder="Search for Orders"
              style={{paddingLeft: 40, fontSize: 16, fontWeight: 'bold',}}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{position: 'absolute', left: 30, top: 23}}>
            <MI name="search" style={{fontWeight: 'bold', color:'#94969f'}} size={27} />
          </TouchableOpacity>
        </View>
      <ScrollView>
    

        {loading ? (
          <ScrollView>
            <View
              style={{
                height: height * 0.12,
                flexDirection: 'row',
                width: width * 0.96,
                backgroundColor: '#fff',
                marginTop: 10,
                marginLeft: 7,
                marginRight: 10,
                borderRadius: 20,
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                height: height * 0.12,
                flexDirection: 'row',
                width: width * 0.96,
                backgroundColor: '#fff',
                marginTop: 10,
                marginLeft: 7,
                marginRight: 10,
                borderRadius: 20,
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: height * 0.12,
                flexDirection: 'row',
                width: width * 0.96,
                backgroundColor: '#fff',
                marginTop: 10,
                marginLeft: 7,
                marginRight: 10,
                borderRadius: 20,
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: height * 0.12,
                flexDirection: 'row',
                width: width * 0.96,
                backgroundColor: '#fff',
                marginTop: 10,
                marginLeft: 7,
                marginRight: 10,
                borderRadius: 20,
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: height * 0.12,
                flexDirection: 'row',
                width: width * 0.96,
                backgroundColor: '#fff',
                marginTop: 10,
                marginLeft: 7,
                marginRight: 10,
                borderRadius: 20,
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: height * 0.12,
                flexDirection: 'row',
                width: width * 0.96,
                backgroundColor: '#fff',
                marginTop: 10,
                marginLeft: 7,
                marginRight: 10,
                borderRadius: 20,
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.93,
                }}>
                <View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>

                <View style={{marginRight: 10}}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.01,
                      padding: 10,
                    }}>
                    <ShimmerPlaceorder
                      duration={1000}
                      stopAutoRun={false}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.2,
                        height: height * 0.01,
                        //borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              //   horizontal={true}
              showsVerticalScrollIndicator={true}
              data={allOrder}
              renderItem={({item}) => <Item item={item} />}
              keyExtractor={item => item.orderno}
            />
          </View> 
        )}
      </ScrollView>
    </View>
  );
}
