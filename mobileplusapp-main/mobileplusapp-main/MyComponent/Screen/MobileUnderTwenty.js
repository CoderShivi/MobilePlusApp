import React,{useEffect,useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const {width, height} = Dimensions.get('window');
import { ServerURL,getData,postData } from '../Services/FetchNodeServices';
import { useNavigation } from '@react-navigation/native';
export default function MobileUnderTwenty() {
    const navigation=useNavigation()
  const [topPick, setTopPick] = useState([]);
  const fatchAllTopPicks = async () => {

    var result = await postData('product1/productitembyid/', {
      categoryid: 16,
    });
    if (result) {
      //alert(JSON.stringify(result))
     // setTopPick(result);

      var re= result.filter((item)=>{
        return (item.offerprice < 21000 && item.offerprice > 16000)
      })
      setTopPick(re)
             // setSmlrProduct(re);
    } else {
      alert('Invalid Password/Email/Mobile');
    }
 
  };
  useEffect(() => {
    fatchAllTopPicks();
  }, []);

  const ShowCards = ({item}) => (
    <TouchableOpacity style={{padding: 3}}
    onPress={() =>
        navigation.navigate('ProductDeatailsOne', {id: item.productid})
      }
      activeOpacity={0.7}
    >
      <View
        style={{
          height: height * 0.4,
          width: width * 0.48,
          borderWidth: 1,
          borderColor: 'rgba(40,44,63,0.10)',
        }}>
        <View style={{height: height * 0.3,width: width * 0.48,justifyContent:'center'}}>
          <Image
            source={{uri:`${ServerURL}/images/${item.picture}`}}
            style={{resizeMode: 'contain', width: width * 0.40, height: height*0.25,backgroundColor:'#fff',alignSelf:'center',}}
          />
        </View>

        <View style={{alignItems: 'flex-start',paddingLeft:10}}>
          <Text numberOfLines={1} style={{fontFamily:'Lato-BoldItalic',fontSize: 14, color: '#000', fontWeight: 500}}>
            {item.productname}
          </Text>
          <Text numberOfLines={1} style={{fontFamily:'Lato-BoldItalic',fontSize: 12, color: '#ff3f6c', fontWeight: 500}}>
          &#x20b9;<Text style={{textDecorationLine:'line-through'}}>{item.price}</Text>
          </Text>
          <Text numberOfLines={1}
            style={{
              fontFamily:'Lato-BoldItalic',
              fontSize: 11,
              color: 'rgba(40, 44, 63, 0.5)',
              fontWeight: 500,
            }}>
            &#x20b9;{item.offerprice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor:'#fff'}}>
        <View style={{padding: 18}}>
        <Text style={{fontFamily:'Lato-BoldItalic',color: '#535766', fontSize: 16, fontWeight: 'bold'}}>
          Mobile Under 20,000
        </Text>
      </View>
      <FlatList
      horizontal={true}
        showsVerticalScrollIndicator={false}
        //numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={topPick}
        renderItem={({item}) => <ShowCards item={item} />}
        keyExtractor={item => item.productid}
      />
    </SafeAreaView>
  );
}