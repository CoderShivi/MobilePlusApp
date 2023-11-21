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
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
 
import {ServerURL, getData} from '../Services/FetchNodeServices';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
export default function ({}) {
  const [topPick, setTopPick] = useState([]);
  const navigation=useNavigation()
  const[loading,setLoading]=useState(false)
  const ShimmerPlaceorder=createShimmerPlaceholder(LinearGradient)


  const fatchAllTopPicks = async () => {
    setLoading(true)
    var result = await getData('product1/productitemsoffer');
    if (result) {
      setTopPick(result);
    } else {
      alert('Invalid Password/Email/Mobile');
    }
    setLoading(false)
  };
  useEffect(() => {
    fatchAllTopPicks();
  }, []);

  const ShowCards = ({item, index}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDeatailsOne', {id: item.productid})
      }
      style={{
        paddingLeft: 10,
        paddingRight: index === topPick.length - 1 ? 10 : 0,
      }}
      activeOpacity={0.7}
      >
      <View
        style={{
          height: height * 0.36,
          backgroundColor: '#fff',
          borderLeftWidth: 1,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderColor: 'rgba(40,44,63,0.10)',
          // padding:10,
        }}>
        <View style={{height: height * 0.27, width: width * 0.4}}>
          <Image
            source={{uri: `${ServerURL}/images/${item.picture}`}}
            style={{
              backgroundColor: '#fff',
              resizeMode: 'contain',
              width: width * 0.407,
              height: '100%',
              position: 'absolute',
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 8,
            padding: 3,
            backgroundColor: '#ff3f6c',
          }}>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#fff', fontSize: 11}}>
            {parseInt(((item.price - item.offerprice) * 100) / item.price)}% off
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 11,
              fontWeight: 700,
              color: '#000',
              width: width * 0.3,
            }}>
            {item.productname}
          </Text>
          {/* <Text style={{fontSize: 10, fontWeight: 400,lineHeight:15}}>{item.description}</Text> */}

          <View
            style={{flexDirection: 'row', alignItems: 'center', paddingTop: 4}}>
            <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 10, color: '#000', fontWeight: 500}}>
              &#x20b9;{item.offerprice}
            </Text>

            <Text
              style={{fontFamily:'Lato-BoldItalic',
                fontSize: 10,
                color: 'rgba(40, 44, 63, 0.5)',
                fontWeight: 500,
                textDecorationLine: 'line-through',
                paddingLeft: 5,
              }}>
              &#x20b9;{item.price}
            </Text>
          </View>

          <Text
            style={{fontFamily:'Lato-BoldItalic',
              fontSize: 10,
              color: '#ff3f6c',
              fontWeight: 500,
              lineHeight: 15,
              paddingTop: 2,
            }}>
            {parseInt(((item.price - item.offerprice) * 100) / item.price)}% off
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor:'#fff'}} > 
        <View style={{padding: 18}}>
        <Text style={{fontFamily:'Lato-BoldItalic',color: '#535766', fontSize: 16, fontWeight: 'bold'}}>
          Best Sellers
        </Text>
      </View>
      {loading?(
         <View style={{flexDirection:'row',width:width*1,backgroundColor:'#fff'}}>

         <View>
         <View style={{width:width*0.38,height:height * 0.26,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.35,height:height*0.25,}}
          />
          </View>
          
          <View style={{width:width*0.38,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.35,height:height*0.015,}}
          />
          </View>
          
          <View style={{width:width*0.38,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.28,height:height*0.015,}}
          />
          </View>
          

          <View style={{width:width*0.38,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.20,height:height*0.015,}}
          />
          </View>
          
          </View>
        
          
          <View>
         <View style={{width:width*0.38,height:height * 0.26,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.35,height:height*0.25,}}
          />
          </View>
          
          <View style={{width:width*0.38,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.35,height:height*0.015,}}
          />
          </View>
          
          <View style={{width:width*0.38,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.28,height:height*0.015,}}
          />
          </View>
          

          <View style={{width:width*0.38,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.20,height:height*0.015,}}
          />
          </View>
          
          </View>
          
          <View>
         <View style={{width:width*0.20,height:height * 0.26,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.20,height:height*0.25,}}
          />
          </View>
          
          <View style={{width:width*0.20,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.20,height:height*0.015,}}
          />
          </View>
          
          <View style={{width:width*0.20,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.17,height:height*0.015,}}
          />
          </View>
          

          <View style={{width:width*0.20,height:height*0.02,padding:10}}>
          <ShimmerPlaceorder
          duration={1000}
          stopAutoRun={false}
          shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
          style={{width:width*0.13,height:height*0.015,}}
          />
          </View>
          
          </View>
        
        
          </View> 
      ):(
<View>
<FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topPick}
        renderItem={({item, index}) => <ShowCards item={item} index={index} />}
        keyExtractor={item =>item.productid}
        style={{backgroundColor: 'white'}}
      />
          
        </View>
      )}
    
    </SafeAreaView>
  );
}
