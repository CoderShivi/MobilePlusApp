import React, {useRef, useState, useEffect, useTransition} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  ToastAndroid,
  BackHandler
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Carousel from 'react-native-snap-carousel';
import Ant from 'react-native-vector-icons/AntDesign';
import Ent from 'react-native-vector-icons/Entypo';
import Smp from 'react-native-vector-icons/SimpleLineIcons';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pagination} from 'react-native-snap-carousel';
import Avalability from './Avalability';
import {ServerURL, getData, postData} from '../Services/FetchNodeServices';
import AddTobag from './AddTobag';
import CheckDelivery from './CheckDelivery';
import ProductDescription from './ProductDescription';
import SimilarProduct from './SimilarProduct';
import Strip from './Strip';
import Modal from 'react-native-modal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {useDispatch, useSelector} from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';

export default function ProductDeatailsOne({route}) {
  // console.log(route.params.id);
  const isFocused=useIsFocused()
  const {width, height} = Dimensions.get('window');
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const [product, setProduct] = useState([]);
  const [productPicture, setProductPicture] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [picturesss, setPicturesss] = useState([]);
  const [pictureInModel, setPictureInModel] = useState([]);
  //const[colorImages,setColorImages]=useState([])
  const [loading, setLoading] = useState(false);
  const [refresh,setRefresh]=useState(false)
  const [msgStatus, setMsgStatus] = useState('');
  const [msgColor, setMsgColor] = useState('');
  const [checkFocus,setCheckFocus]=useState(false)
  const navigation = useNavigation();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const dispatch = useDispatch();
  const productData = useSelector(state => state.product);
  const productRedux = Object.values(productData);

const [disabled,setDisabled]=useState(false)

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
  const CheckPincode = async pincode => {
    setDisabled(true)
    var body = {
      pincode: pincode,
    };

    var response = await postData('statecity/searchpincode', body);
    // alert(JSON.stringify(response));
   
    console.log('STATE CITY DATA = ', response);
    if (response) {
       dispatch({type: 'ADD_PINCODE', payload: response});
      // alert('Delivery Available in Your Area');
      setMsgStatus('Delivery Available in Your Area');
      setMsgColor('green');
      
    } else if (pincode.length == 0) {
      setMsgStatus('please input pincode');
      setMsgColor('red');
    } else {
      setMsgStatus('We are not deliver this product in your area');
      setMsgColor('red');
      // alert('We are not deliver this product in your area');
    }
    setDisabled(false)
  };
  const fetchAllProduct = async () => {
    setLoading(true);
    var result = await getData(
      'product1/productbyproductid/' + route.params.id,
    );
    // alert(JSON.stringify(result))
    if (result) {
     // alert(JSON.stringify(result))
      setProduct(result);
    } else {
      alert('Invalid Password/Email/Mobile');
    }
    setLoading(false);
  };

  const fetchAllProductPicture = async () => {
    var result = await postData('pp/productpicturedisplaybyid/', {
      productid: route.params.id,
    });

    if (result) {
      setProductPicture(result);
      var data=[]
      result.map((item)=>{
        data.push(`${ServerURL}/images/${item.pppicture}`)
      })
      
      setPicturesss(data)
    } else {
      alert('Invalid Password/Email/Mobile');
    }
  };

  useEffect(() => {
    fetchAllProductPicture();
    fetchAllProduct();
  }, [route.params.id]);
useEffect(()=>{
  
},[isFocused])
 
const handleClick = ( index) => {
    setPictureInModel(index);
   setModelOpen(true);
  };
 

  const handleAddtoCart = () => {
    if(productData[product.productid]){
    ToastAndroid.show('Already Exist', ToastAndroid.SHORT);

    }else{
    ToastAndroid.show('Product Added To Cart', ToastAndroid.SHORT);
    //  dispatch({type: 'ADD_PRODUCT', payload: [product.productid, product]});
    
    //  product['quantity']=1
    //  product['orderstatus']='Home Delivery'
    //  product['notes']='Cash On Delivery'
     const productDetails={...product,quantity:1,orderstatus:'Home Delivery',notes:'Cash On Delivery'}
    // console.log('amilkkpp',[productDetails.productid,productDetails]);
     dispatch({type: 'ADD_PRODUCT', payload: [productDetails.productid,productDetails]}); 

     setRefresh(!refresh)
    }



  //   ToastAndroid.show('Product Added Successfully', ToastAndroid.SHORT);

  //   dispatch({type: 'ADD_PRODUCT', payload: [product.productid, product]});
  //  setRefresh(!refresh)
  };

 

 
  const offert = parseInt(
    ((product.price - product.offerprice) * 100) / product.price,
  );
  const toggleModal = () => {
    setModelOpen(false);
  };



  const handleClickFalse = () => {
    setMsgStatus(false);
  };

  const handleClickAutoFocus=()=>{
  ToastAndroid.show('Check Pin', ToastAndroid.SHORT);
  setCheckFocus(!checkFocus)
  }
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      {loading ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View
            style={{flexDirection: 'row', padding: 20, alignSelf: 'center'}}>
            <View>
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ShimmerPlaceholder
                  stopAutoRun={false}
                  duration={0}
                  shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                  style={{
                    width: width * 0.85,
                    height: height * 0.45,
                    paddingTop: 5,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                />
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.65,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.75,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.2,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.5,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.4,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.7,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.3,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                  <View
                    style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                    <ShimmerPlaceholder
                      stopAutoRun={false}
                      duration={0}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.15,
                        height: 80,
                        paddingTop: 5,
                        marginTop: 10,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                    <ShimmerPlaceholder
                      stopAutoRun={false}
                      duration={0}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.15,
                        height: 80,
                        paddingTop: 5,
                        marginTop: 10,
                        marginLeft: 10,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                    <ShimmerPlaceholder
                      stopAutoRun={false}
                      duration={0}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.15,
                        height: 80,
                        paddingTop: 5,
                        marginTop: 10,
                        marginLeft: 10,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                    <ShimmerPlaceholder
                      stopAutoRun={false}
                      duration={0}
                      shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                      style={{
                        width: width * 0.15,
                        height: 80,
                        paddingTop: 5,
                        marginTop: 10,
                        marginLeft: 10,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{backgroundColor: '#fff', alignSelf: 'flex-start'}}>
                  <ShimmerPlaceholder
                    stopAutoRun={false}
                    duration={0}
                    shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                    style={{
                      width: width * 0.58,
                      height: 20,
                      paddingTop: 5,
                      marginTop: 20,
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{borderRadius: 40, backgroundColor: '#fff'}}>
                <Ant name="arrowleft" size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
            <View style={{alignSelf:'center',alignContent:'center',flexDirection: 'row',backgroundColor:'#fff'}}>
              <View
                style={{
                  borderRadius: 40,
                  backgroundColor: '#fff',
                  marginRight: 15,
                  alignItems:'center',
                  alignSelf:'center'
                }}>
<Smp name="share" size={18} color={'#000'} />

              </View>
              <View
                style={{
                  borderRadius: 40,
                  backgroundColor: '#fff',
                  marginRight: 15,
                  alignItems:'center',
                  alignSelf:'center'
                }}>
                <Smp name="heart" size={20} color={'#000'} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Order')}
                style={{
                  borderRadius: 40,
                  backgroundColor: '#fff',
                  paddingRight: 10,
                  alignItems:'center',
                  alignSelf:'center'
                }}>
                <Smp name="handbag" size={20} color={'#000'} />
                {productRedux.length > 0 ? (
                  <View
                    style={{
                      position: 'absolute',
                      left: 12,
                      bottom: 11,
                      backgroundColor: 'red',
                      borderRadius: 7,
                      width: width * 0.04,
                      height: height * 0.022,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{fontFamily:'Lato-BoldItalic',
                        fontSize: 10,
                        padding: 0,
                        color: '#fff',
                        fontWeight: 500,
                      }}>
                      {productRedux.length}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: height * 0.5,justifyContent:'center',
                alignItems:'center',
                alignContent:'center',
            width: width * 1,backgroundColor:'#fff',  alignSelf:'center',}}>
            <SliderBox
 images={picturesss}
              autoplay={true}
              sliderBoxHeight={height*1}

         
         onCurrentImagePressed={index=> handleClick(index)}
              dotColor="#000"
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={20}
              circleLoop={true}
              //resizeMethod={'resize'}
              resizeMode={'contain'}
              paginationBoxStyle={{
                position: 'absolute',
                bottom: 0,
                padding: 0,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingVertical: 1,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: 'rgba(128, 128, 128, 0.92)',
              }}
              //parentWidth
              ImageComponentStyle={{
                alignSelf:'center',
                justifyContent:'center',
                alignItems:'center',
                alignContent:'center',
                //borderRadius: 15,
                width: width*1,
                height:height*0.45,
                marginTop: 20,
                // padding:10
              }}
              imageLoadingColor="black"
            />
           
          </View>
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              padding: 10,
              alignItems: 'center',
            }}>
            {/* <View>
              <View
                style={{
                  borderRadius: 40,
                  backgroundColor: '#fff',
                }}>
                <Mci name="cards-outline" size={25} color={'#000'} />
              </View>
            </View> */}
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  borderRadius: 40,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignSelf:'center',
                  alignItems:'center',
                }}>
                <Text style={{color:'#94969f',fontFamily:'Lato-BoldItalic',paddingRight: 5, fontSize: 12,alignSelf:'center'}}>
                  4.2 <Mci name="star" size={13} color={'green'} />
                </Text>
                <Text
                  style={{fontFamily:'Lato-BoldItalic',
                    fontSize: 12,
                    paddingLeft: 5,
                    borderLeftWidth: 1,
                    borderLeftColor: 'rgba(40,44,63,0.10)',
                    alignSelf:'center',
                    color:'#94969f'

                  }}>
                  3.3k
                </Text>
              </View>
            </View>
          </View>

          <View style={{paddingLeft: 10, paddingTop: 0}}>
            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={2} style={{fontFamily:'Lato-BoldItalic',fontWeight: 700, color: '#000'}}>
                {product.productname}
              </Text>
              {/* <Text style={{color: '#000'}}> Men Purple Boxy</Text> */}
            </View>
            <View>
              {/* <Text style={{color: '#000'}}> */}
              {/* {product.description} */}
              {/* <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            color: 'rgb(148, 150, 159)',
            fontWeight: 500,
            marginTop: 2,
          }}>
        </Text> */}
              {/* Fit Printed Round Neck Pure Cotton Oversized
              </Text> */}
              {/* <Text style={{color: '#000'}}>T-shirt</Text> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 4,
                alignItems: 'center',
              }}>
              <Text style={{color:'#94969f',fontFamily:'Lato-BoldItalic',fontSize: 12}}>MRP</Text>
              <Text
                style={{color:'#94969f',fontFamily:'Lato-BoldItalic',textDecorationLine: 'line-through', paddingLeft: 4}}>
                ₹{product.price}
              </Text>
              <Text
                style={{fontFamily:'Lato-BoldItalic',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#000',
                  paddingLeft: 4,
                }}>
                ₹{product.offerprice}
              </Text>
              <Text style={{fontFamily:'Lato-BoldItalic',color: '#ff3f6c', paddingLeft: 4}}>
                ({offert}% OFF)
              </Text>
            </View>
            <View>
              <Text style={{color:'#94969f',fontFamily:'Lato-BoldItalic',}}>inclusive of all taxes</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 4,alignItems:"center"}}>
              <Text style={{fontFamily:'Lato-BoldItalic',color: '#ff3f6c', fontWeight: 700,alignItems:"center",fontWeight:14}}>Hurry!</Text>
              <Text style={{color:'#94969f',fontFamily:'Lato-BoldItalic',paddingLeft: 4,alignItems:"center",fontWeight:14}}>Likely to be sold out</Text>
              <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontWeight: 700, paddingLeft: 4,alignItems:"center",fontWeight:14}}>
                in 3 days
              </Text>
            </View>
          </View>
          <View style={{paddingLeft: 9}}>
            <Avalability  product={product} />
          </View>
          <View>
            <AddTobag handleClickAutoFocus={handleClickAutoFocus} handleAddtoCart={handleAddtoCart} product={product}
             checkPinState={msgStatus}
            />
          </View>
          <Strip />
          <View>
            <CheckDelivery  checkFocus={checkFocus} disabled={disabled}
                handleClickFalse={() => handleClickFalse()}
                mstate={msgStatus}
                mcolor={msgColor}
                handlecCheckpincode={pincode => CheckPincode(pincode)}
              />
          </View>
          <Strip />
          <View>
            <ProductDescription product={product} />
          </View>
          <Strip />
          <View style={{paddingBottom: 20}}>
            <SimilarProduct product={product} />
          </View>

          <View>
            <Modal
              isVisible={modelOpen}
              style={{
                flex: 1,
                width: width * 1,
                height:height*1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor:'#fff'
              }}
              onRequestClose={() => {
                setModelOpen(false);
              }}>
               
              <View style={{width: width * 1}}>

 <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={width * 1}
        imageHeight={height * 0.5}
        pinchToZoom={true}
        panToMove={true}>
          
            <SliderBox
              firstItem={pictureInModel}
              images={picturesss}
              //autoplay={true}
              //sliderBoxHeight={height*1}
              circleLoop={true}
              //resizeMethod={'resize'}
              resizeMode={'contain'}
              dotStyle={{
                display:'none'
              }}
              
              
              ImageComponentStyle={{
                alignSelf:'center',
                justifyContent:'center',
                alignItems:'center',
                alignContent:'center',
                width: width*1,
                height:height*0.45,
                marginTop: 20,
               // backgroundColor:'red'
             
              }}
              ImageLoader='none'
             
            />
            </ImageZoom>
            
           

                
              </View>

              <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    position: 'absolute',
                    top:10,
                   //bottom:480,
                    left: 10,
                    padding: 7,
                    // borderRadius: 40,
                    // backgroundColor:'red',
                    width:width*1,
                    height:height*0.05
                  }}>
                  <Ant name="close" size={25} color={'#000'} />
                </TouchableOpacity>
            </Modal>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
