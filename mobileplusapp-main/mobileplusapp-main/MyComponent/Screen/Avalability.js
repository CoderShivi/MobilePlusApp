import React, {useEffect, useState} from 'react';
import {postData, getData, ServerURL} from '../Services/FetchNodeServices';
import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
export default function Avalability({product,handleClick}) {
  const [productByColor, setProductByColor] = useState([]);
  //console.log(prdid)
  const navigation=useNavigation()
  const fetchAllProductPictureByColor = async () => {
    // alert('hi')
    var result = await postData('product1/productitemsbycolor/', {
      brandid: product.brandid,
      categoryid: product.categoryid,
      modelid: product.modelid,
    });
   // alert(JSON.stringify(result));
   // console.log(result);
    if (result) {
      
      setProductByColor(result);
    } else {
      alert('Invalid Password/Email/Mobile');
    }
  };
  useEffect(() => {
    fetchAllProductPictureByColor();
  }, [product]);

 

  const ShowCards = ({item, index}) => (
    <TouchableOpacity onPress={() =>
      navigation.navigate('ProductDeatailsOne', {id: item.productid})
    }
      style={{
        paddingLeft: index != 0 ? 10 : 0,
        // paddingRight: index === DATA.length - 1 ? 5 : 0,
      }}
      activeOpacity={0.7}
      >
      <View>
        <View
          style={{
            height: height * 0.11,
            width: width * 0.17,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: 'rgba(40,44,63,0.10)',
            justifyContent:'center'
          }}>
          <Image
            // source={item.image}
            source={{uri: `${ServerURL}/images/${item.picture}`}}
            style={{
              resizeMode: 'contain',
              width: width * 0.17,
              height: height*0.09,
            }}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 10,
              fontWeight: 400,
              color: '#000',
              lineHeight: 20,
            }}>
            {item.color}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={{padding: 0}}>
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            color: '#000',
            fontSize: 12,
            fontWeight: 700,

            paddingBottom: 5,
            paddingTop: 5,
          }}>
          Available Colors
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={productByColor}
        renderItem={({item, index}) => <ShowCards item={item} index={index} />}
        keyExtractor={item => item.productid}
        style={{backgroundColor: 'white'}}
      />
    </SafeAreaView>
  );
}
