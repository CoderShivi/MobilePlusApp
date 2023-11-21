import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Star from 'react-native-vector-icons/FontAwesome';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrowswitch from 'react-native-vector-icons/Octicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Coupons from './Coupons';
import {ServerURL, postData} from '../Services/FetchNodeServices';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';

export default function ProductListing({route}) {
  //console.log(route.params.pn);
  // console.log(route.params.modelid);
  // console.log(route.params.brdid);
  const navigation = useNavigation();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const [filts,setFilts]=useState([])
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const {width, height} = Dimensions.get('window');

  const refRBSheet = useRef();
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
  const fetchAllProduct = async () => {
    setLoading(true);
    if (route.params.cid) {
      var result = await postData('product1/productitembyid/', {
        categoryid: route.params.cid,
      });
    } else if (route.params.brdid) {
      var result = await postData('product1/branddetailsbyproductid/', {
        brandid: route.params.brdid,
      });
    } else {
      var result = await postData('product1/productitemsAdvSearch/', {
        pat: route.params.pn,
      });
    }

    //alert(JSON.stringify(result))

    if (result) {
      setProduct(result);
      setFilts(result)
    } else {
      alert('Invalid Password/Email/Mobile');
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAllProduct();
  }, [route.params.pn]);

  const Item = ({item}) => (
    <TouchableOpacity  activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('ProductDeatailsOne', {id: item.productid})
      }
      style={{
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomColor: '#d4d5d9',
        borderRightColor: '#d4d5d9',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          width: width * 0.5,
          height: height * 0.35,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            height: height * 0.25,
            width: width * 0.25,
            position: 'relative',
          }}
          source={{uri: `${ServerURL}/images/${item.picture}`}}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          marginTop: height * 0.32,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            color: '#000',
            marginLeft: 8,
            fontWeight: 700,
            fontSize: 10,
          }}>
          4.1
        </Text>
        <Star style={{marginLeft: 2}} color="#1abc9c" name="star" size={8} />
        <Text style={{fontFamily:'Lato-BoldItalic',color: 'rgb(148, 150, 159)', marginLeft: 5}}>|</Text>
        <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 10, marginLeft: 5, fontWeight: 700}}>
          43.4k
        </Text>
      </View>
      <View style={{flexDirection: 'column', paddingLeft: 7}}>
        <Text
          numberOfLines={1}
          style={{fontFamily:'Lato-BoldItalic',
            color: '#282c3f',
            fontWeight: 700,
            fontSize: 13,
            marginTop: 2,
            width: width * 0.4,
          }}>
          {item.productname}
        </Text>
     
        <View style={{flexDirection: 'row', marginTop: 2,alignItems:'center'}}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              textDecorationLine: 'line-through',
              fontWeight: 500,
              fontSize: 12,
            }}>
            ₹{item.price}
          </Text>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 12,
              fontWeight: 700,
              color: '#282c3f',
              marginLeft: 5,
            }}>
            ₹{item.offerprice}
          </Text>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              color: '#ff905a',
              fontWeight: 700,
              fontSize: 12,
              marginLeft: 5,
            }}>
            Rs.{parseInt((item.price - item.offerprice)/(item.price)*100)}%OFF
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            style={{
              width: width * 0.14,
              height: height * 0.02,
              resizeMode: 'contain',
            }}
            source={require('../Assets/mexpress.png')}
          />
          <Text style={{fontFamily:'Lato-BoldItalic',color: 'rgb(148, 150, 159)', marginLeft: 5}}>|</Text>

          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 10, marginLeft: 5}}>Same day delivery</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

 const handleClickPriceHtoL=()=>{
  var re= filts.filter((item)=>{
    return item.offerprice
  })
  setProduct( re.sort((a, b) => parseFloat(b.offerprice) - parseFloat(a.offerprice)))
 }
 const handleClickPriceLtoH=()=>{
  var re= filts.filter((item)=>{
    return item.offerprice  
  })
  setProduct( re.sort((a, b) => parseFloat(a.offerprice) - parseFloat(b.offerprice)))

 } 
 const handleClickPriceWhatsNew=()=>{
  var re= filts.filter((item)=>{
    return item.offerprice 
  })
  setProduct(re.reverse())
 }
 return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.5,
                    height: height / 3.4,
                  }}>
                  <ShimmerPlaceholder
                    duration={0}
                    stopAutoRun={false}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.4,
                      height: height / 3.4,
                      borderRadius: 0,
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.15,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    stopAutoRun={false}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.25,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    stopAutoRun={false}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.35,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
              </View>

              <View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.5,
                    height: height / 3.4,
                  }}>
                  <ShimmerPlaceholder
                    duration={0}
                    stopAutoRun={false}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.4,
                      height: height / 3.4,
                      borderRadius: 0,
                      // padding: 10,
                      //margin:5
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    stopAutoRun={false}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.15,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    stopAutoRun={false}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.25,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    stopAutoRun={false}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.35,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.5,
                    height: height / 3.4,
                  }}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.4,
                      height: height / 3.4,
                      borderRadius: 0,
                      // padding: 10,
                      //margin:5
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.15,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.25,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.35,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
              </View>

              <View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.5,
                    height: height / 3.4,
                  }}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.4,
                      height: height / 3.4,
                      borderRadius: 0,
                      // padding: 10,
                      //margin:5
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.15,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.25,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.35,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.5,
                    height: height / 3.4,
                  }}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.4,
                      height: height / 3.4,
                      borderRadius: 0,
                      // padding: 10,
                      //margin:5
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.15,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.25,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.35,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
              </View>

              <View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.5,
                    height: height / 3.4,
                  }}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.4,
                      height: height / 3.4,
                      borderRadius: 0,
                      // padding: 10,
                      //margin:5
                    }}
                  />
                </View>

                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.15,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.25,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignItems: 'flex-start'}}>
                  <ShimmerPlaceholder
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.35,
                      height: height * 0.02,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <>
          {product.length ? (
            <>
              <FlatList
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                data={product}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.productid}
              />
            </>
          ) : (
            <>
              <Image
                source={require('../Assets/NoProduct.jpg')}
                style={{width: width, height: height * 0.86}}
              />
            </>
          )}
        </>
      )}

      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 0.5,
          borderTopColor: 'rgb(148, 150, 159)',
          padding: 10,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View
            style={{
              width: width *1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Arrowswitch color="#282c3f" name="arrow-switch" size={15} />
            <Text
              style={{fontFamily:'Lato-BoldItalic',
                fontWeight: 500,
                color: '#282c3f',
                letterSpacing: 1.5,
                marginLeft: 8,
              }}>
              SORT
            </Text>
          </View>
        </TouchableOpacity>
        {/* <View
          style={{
            color: '#d4d5d9',
            justifyContent: 'center',
            borderRightWidth: 1,
            height: 25,
            marginLeft:8
          }}></View> */}
{/* 
        <View
          style={{
            width: width * 0.45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Filter color="#282c3f" name="filter" size={15} />
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontWeight: 500,
              color: '#282c3f',
              letterSpacing: 1.5,
              marginLeft: 8,
            }}>
            FILTER
          </Text>
        </View> */}
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={220}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{flexDirection: 'column', margin: 20}}>
          
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              borderBottomWidth: 1,
              width: '100%',
              alignSelf: 'center',
              fontSize: 12,
              borderBottomColor: '#d4d5d9',
              letterSpacing: 1,
              marginBottom: 10,
              paddingBottom: 15,
            }}>
            SORT BY
          </Text>
          <TouchableOpacity onPress={()=>handleClickPriceWhatsNew()}>
          
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 14,
              lineHeight: 50,
              fontWeight: 500,
              letterSpacing: 1,
            }}>
            What's new
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleClickPriceHtoL()}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 14,
              lineHeight: 50,
              fontWeight: 500,
              letterSpacing: 1,
            }}>
            Price-high to low
          </Text>
          </TouchableOpacity>
          {/* <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 14,
              lineHeight: 50,
              fontWeight: 500,
              letterSpacing: 1,
            }}>
            Popularity
          </Text> */}
          <TouchableOpacity onPress={()=>handleClickPriceLtoH()}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 14,
              lineHeight: 50,
              fontWeight: 500,
              letterSpacing: 1,
            }}>
            Price-low to high
          </Text></TouchableOpacity>
          
        </View>
      </RBSheet>
    </View>
  );
}
