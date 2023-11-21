import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {postData, getData, ServerURL} from '../Services/FetchNodeServices';
export default function SimilarProduct({product}) {
  const navigation = useNavigation();
  // console.log(product)
  //alert(JSON.stringify(product.categoryid))
  const [smlrProduct, setSmlrProduct] = useState([]);
  // const DATA = [
  //   {
  //     id: 1,
  //     image: require('../Assets/slp6.jpg'),
  //     name: 'Khadims',
  //     title: 'Men Printed Tong..',
  //     price: 543,

  //   },
  //   {
  //     id: 2,
  //     image: require('../Assets/slp2.jpg'),
  //     name: 'Khadims',
  //     title: 'Men Printed Tong..',
  //     price: 487,

  //   },
  //   {
  //     id: 3,
  //     image: require('../Assets/slp4.jpg'),
  //     name: 'Max',
  //     title: 'Women Open toe..',
  //     price: 150,

  //   },
  //   {
  //     id: 5,
  //     image: require('../Assets/slp5.jpg'),
  //     name: 'Khadims',
  //     title: 'Men Printed Tong..',
  //     price: 464,

  //   },
  //   {
  //     id: 6,
  //     image: require('../Assets/slp6.jpg'),
  //     name: 'Khadims',
  //     title: 'Men Printed Tong..',
  //      price: 229,

  //   },

  // ];

  const fetchAllProduct = async () => {
    if (product.categoryid) {
      var result = await postData('product1/productitembyid/', {
        categoryid: product.categoryid,
      });
      // alert(JSON.stringify(result))
      if (result) {
var re= result.filter((item)=>{
  return item.productid != product.productid
})
        setSmlrProduct(re);
      
      } else {
        alert('Invalid Password/Email/Mobile');
      }
    }
  };
  useEffect(() => {
    fetchAllProduct();
  }, [product]);

  const ShowCards = ({item, index}) => (
    <TouchableOpacity  activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('ProductDeatailsOne', {id: item.productid})
      }
      style={{
        paddingLeft: 5,
        paddingRight: index === smlrProduct.length - 1 ? 5 : 0,
      }}>
      <View
        style={{
          height: height * 0.29,
          width: width * 0.31,
          backgroundColor: '#fff',
          borderLeftWidth: 1,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderColor: 'rgba(40,44,63,0.10)',
        }}>
        <View
          style={{
            height: height * 0.2,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: `${ServerURL}/images/${item.picture}`}}
            //source={item.image}
            style={{
              resizeMode: 'contain',
              width: width * 0.15,
              height: height * 0.15,
            }}
          />
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            marginLeft: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{fontFamily:'Lato-BoldItalic',
              width:width*0.28,
              fontSize: 12,
              fontWeight: 700,
              color: '#000',
              lineHeight: 20,
            }}>
            {item.productname}
          </Text>

          <Text
            numberOfLines={1}
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 12,
              color: 'red',
              fontWeight: 500,
              lineHeight: 20,
             
            }}>
            &#x20b9;&nbsp;<Text style={{fontFamily:'Lato-BoldItalic',textDecorationLine:'line-through',}}>{item.price}</Text>
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontFamily:'Lato-BoldItalic',
              fontSize: 12,
              fontWeight: "bold",
              lineHeight: 20,
              color: '#000',
            }}>&#x20b9;&nbsp;{item.offerprice}
            
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            color: '#535766',
            fontSize: 15,
            fontWeight: 700,
            //letterSpacing: 1.5,
          }}>
          Fastest Selling Similar products
        </Text>
        <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 12, color: '#ff3f6c', fontWeight: 700}}>
          Likely to be sold out soon
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={smlrProduct}
        renderItem={({item, index}) => <ShowCards item={item} index={index} />}
        keyExtractor={item => item.productid}
        style={{backgroundColor: 'white'}}
      />
    </SafeAreaView>
  );
}
