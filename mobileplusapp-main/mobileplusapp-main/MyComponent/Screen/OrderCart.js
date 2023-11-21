import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign';
import ENT from 'react-native-vector-icons/Entypo';
import ANT from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
import {useDispatch, useSelector} from 'react-redux';
import {ServerURL} from '../Services/FetchNodeServices';
import CheckBox from '@react-native-community/checkbox';
import {useIsFocused, useNavigation} from '@react-navigation/native';

export default function OrderCart({handleClickRefresh,handleClickDeletePrice}) {
  const [refresh, setRefresh] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const productData = useSelector(state => state.product);
  const pricesData = useSelector(state => state.prices);
   //console.log('a',productData);
  const product = Object.values(productData);
  //alert(JSON.stringify(product))
  var newarr = product.map(item => ({...item, quantity: 1}));
  // console.log(newarr);

  // const finalPrice = newarr.reduce(
  //   (acc, item) => {
  //     acc.mrp += Number(item.price) * item.quantity;
  //     acc.discount +=
  //       (Number(item.price) - Number(item.offerprice)) * item.quantity;
  //     acc.pricepaid += Number(item.offerprice) * item.quantity;
  //     return acc;
  //   },
  //   { mrp: 0, discount: 0, pricepaid: 0 }
  // );
  const IncreasePrice = item => {
    const data = {
      ...productData[item.productid],
      quantity: (productData[item.productid]?.quantity ) + 1,
    };
    dispatch({
      type: 'ADD_PRODUCT',
      payload: [data.productid, data],
    });
    setRefresh(!refresh);
    handleClickRefresh()
  };

  const DecreasePrice = item => {
     const data = {
      ...productData[item.productid],
      quantity: (productData[item.productid]?.quantity )- 1,
    };
      if (data.quantity != 0) {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: [data.productid, data],
      });
    } else {

      dispatch({
        type: "REMOVE_PRODUCT",
        payload: data.productid,
      });
    //  hanChekBox()
    setPrices([]);
    setSelection([]);
    }
    setRefresh(!refresh);
    handleClickRefresh()
  };
  // console.log(finalPrice.pricepaid)
  // const [isSelected, setSelection] = useState([]);

  const finalPriceData = pricesData.reduce(
    (acc, item) => {
      //console.log(productData[item]);
      acc.mrp += Number(productData[item]?.price)*productData[item]?.quantity ;
      acc.pricepaid += Number(productData[item]?.offerprice)*productData[item]?.quantity;
      return acc;
    },
    {mrp: 0, discount: 0, pricepaid: 0},
  );

  const [isSelected, setSelection] = useState(pricesData);
  const [prices, setPrices] = useState(finalPriceData);

  // const [prices, setPrices] = useState({});
  const dispatch = useDispatch();
  // const cartData=Object.values(addId)
  useEffect(() => {}, [isFocused]);

  const handleClickDeleteCart = (txt, item) => {
    handleClickDeletePrice();
    var data = [item];

    data.map(i => {
      dispatch({
        type: 'REMOVE_PRODUCT',
        payload: i.productid,
      });
    });
    setPrices([]);
    setSelection([]);
    setRefresh(!refresh);
  };

  const hanChekBox = (txt, id) => {
    var data = [...isSelected];
    if (txt) {
      if (data.indexOf(id) == -1) data.push(id);
      setSelection([...data]);
    } else {
      var index = data.indexOf(id);
      if (index != -1) {
        data.splice(index, 1);
        setSelection([...data]);
      }
    }

    const finalPrice = data.reduce(
      (acc, id) => {
        //console.log((productData[id].price)*productData[id].quantity);
        acc.mrp += Number(productData[id]?.price)*productData[id]?.quantity ;
        acc.pricepaid+=Number(productData[id]?.offerprice)*productData[id]?.quantity;
        return acc;
      },
      {mrp: 0, discount: 0, pricepaid: 0},
    );
    setPrices(finalPrice);

    dispatch({type: 'ADD_PRICES', payload: data});
  };

  const handleCheckAllBox = txt => {
    if (txt) {
      var data = [];
      product.map(item => {
        data.push(item.productid);
      });
      setSelection([...data]);

      const finalPrice = data.reduce(
        (acc, id) => {
          // acc.mrp += productData[id].price;
          // acc.pricepaid += productData[id].offerprice;
          acc.mrp += Number(productData[id]?.price)*productData[id]?.quantity;
          acc.pricepaid+=Number(productData[id]?.offerprice)*productData[id]?.quantity;
          return acc;
        },
        {mrp: 0, discount: 0, pricepaid: 0},
      );
      setPrices(finalPrice);
      dispatch({type: 'ADD_PRICES', payload: data});
    } else {
      var data = [];
      setSelection([]);

      const finalPrice = data.reduce(
        (acc, id) => {
          acc.mrp += Number(productData[id]?.price)*productData[id]?.quantity ;
          acc.pricepaid+=Number(productData[id]?.offerprice)*productData[id]?.quantity;
          return acc;
        },
        {mrp: 0, discount: 0, pricepaid: 0},
      );
      setPrices(finalPrice);
      dispatch({type: 'ADD_PRICES', payload: data});
    }
  };

  const handleClickDeleteCard = () => {
    handleClickDeletePrice();
    isSelected.map(item => {
      dispatch({
        type: 'REMOVE_PRODUCT',
        payload: item,
      });
    });
    setPrices([]);
    setSelection([]);
    setRefresh(!refresh);
  };

  const ShowCards = ({item, index}) => (
    <View style={{padding: 5}}>
      <View
        style={{
          height: height * 0.25,
          width: width * 1,
          backgroundColor: '#fff',
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: index == product.length - 1 ? 0 : 1,
          borderColor: 'rgba(40,44,63,0.10)',
          flexDirection: 'row',
        }}>
        <View>
          <CheckBox
            tintColors={{true: '#FF3F6C', false: 'black'}}
            disabled={false}
            value={isSelected.indexOf(item.productid) != -1}
            onValueChange={txt => hanChekBox(txt, item.productid)}
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDeatailsOne', {id: item.productid})
          }
          activeOpacity={0.7}
          style={{
            backgroundColor: '#fff',
            width: width * 0.25,
            height: height * 0.24,
            //alignSelf: 'center',
            //justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: `${ServerURL}/images/${item.picture}`}}
            style={{
              resizeMode: 'contain',
              width: width * 0.2,
              height: height * 0.2,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            //paddingLeft: 10,
            backgroundColor: '#fff',
            width: width * 0.55,
            height: height * 0.24,
            //alignSelf: 'center',
            //paddingLeft:18
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Lato-BoldItalic',
                fontSize: 14,
                fontWeight: 700,
                color: '#000',
                lineHeight: 20,
              }}>
              {item.productname}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Lato-BoldItalic',
                fontSize: 10,
                fontWeight: 700,
                paddingTop: 5,
                lineHeight: 15,
                color:'#94969f'
              }}>
              {item.productname}
            </Text>
          </View>

          <View
            style={{
              // justifyContent: 'space-between',
              marginTop: 5,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                fontSize: 14,
                fontWeight: 700,
                color: '#282c3f',
              }}>
              ₹&nbsp;{item.offerprice}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                fontSize: 14,
                fontWeight: 700,
                // color: 'red',
                marginLeft: 15,
                color:'#94969f'
              }}>
              ₹&nbsp;
              <Text
                style={{ color:'#94969f',
                  fontFamily: 'Lato-BoldItalic',
                  textDecorationLine: 'line-through',
                }}>
                {item.price}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                color: 'red',
                fontWeight: 700,
                fontSize: 14,
                marginLeft: 15,
              }}>
              {parseInt(((item.price - item.offerprice) * 100) / item.price)}%
              OFF
            </Text>
          </View>

          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <TouchableOpacity
              onPress={() => DecreasePrice(item)}
              style={{
                width: width * 0.08,
                height: height * 0.04,
                backgroundColor: '#FF3F6C',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: width * 0.08,
                height: height * 0.04,
                backgroundColor: '',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
               { (productData[item.productid]?.quantity)}
               
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => IncreasePrice(item)}
              style={{
                width: width * 0.08,
                height: height * 0.04,
                backgroundColor: '#FF3F6C',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MCI name="check" size={16} color={'green'} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Lato-BoldItalic',
                paddingLeft: 5,
                color:'#94969f'
              }}>
              Same Delivery Available
            </Text>
          </View>
          {/* <View ><Text></Text></View> */}
          {/* <TouchableOpacity onPress={()=>IncreasePrice(item)} style={{width:width*0.1}}><Text style={{fontSize:30,color:'#fff'}}>+</Text></TouchableOpacity> */}

          {/* <View
            style={{
              marginLeft: 5,
              marginBottom: 5,
              marginTop: 0,
              backgroundColor: '#f1f3f6',
              width: width * 0.15,
              alignItems: 'center',
              padding: 1,
            }}>
            <Text style={{fontSize: 14, fontWeight: 700}}>Qty:{item.quantity}</Text>
          </View> */}
        </View>

        <View>
          <TouchableOpacity
            onPress={txt => handleClickDeleteCart(txt, item)}
            style={{
              width: width * 0.2,
              height: height * 0.2,
              padding: 5,
              paddingLeft: 5,
            }}>
            <Ant name="close" size={20} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View
        style={{
          //marginTop: 10,
          paddingLeft: 7,
          paddingTop:15,
          paddingBottom:15,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{}}>
          <CheckBox
            tintColors={{true: '#FF3F6C', false: 'black'}}
            disabled={false}
            value={isSelected.length == product.length ? true : false}
            onValueChange={status => handleCheckAllBox(status)}
          /></View>
          <Text
            style={{
              fontFamily: 'Lato-BoldItalic',
              letterSpacing: 0.5,
              fontWeight: 700,
              color: '#535766',
              fontSize: 13,
              marginLeft: 9,
            }}>
            {isSelected.length > 0 ? isSelected.length : 'NO'} ITEMS SELECTED
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-BoldItalic',
              letterSpacing: 0.5,
              color: '#ff3f6c',
              fontSize: 13,
              fontWeight: 700,
              marginLeft: 9,
            }}>
            {isSelected.length > 0 ? (
              <>(₹{finalPriceData?.pricepaid?.toLocaleString()})</>
            ) : (
              '(₹ 0)'
            )}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ENT
            style={{
              letterSpacing: 0.5,
              fontWeight: 700,
              color: '#535766',
              marginRight: 20,
            }}
            name="share"
            size={24}
          />
          <TouchableOpacity onPress={handleClickDeleteCard}>
            <ANT
              style={{
                letterSpacing: 0.5,
                fontWeight: 700,
                color: '#535766',
                marginRight: 9,
              }}
              name="delete"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <FlatList
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
          //data={product}
          data={newarr}
          renderItem={({item, index}) => (
            <ShowCards item={item} index={index} />
          )}
          keyExtractor={item => item.productid}
          style={{backgroundColor: 'white'}}
        />
      </View>
    </SafeAreaView>
  );
}
