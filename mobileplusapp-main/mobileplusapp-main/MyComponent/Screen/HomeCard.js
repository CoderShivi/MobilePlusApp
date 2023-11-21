import React ,{useState,useEffect}from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { getData,postData,ServerURL } from '../Services/FetchNodeServices';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const {width, height} = Dimensions.get('window');
export default function HomeCard({}) {
  const navigation=useNavigation()
  const ShimmerPlaceorder=createShimmerPlaceholder(LinearGradient)

  const[topbrand,setTopBrand]=useState([])
  const[loading,setLoading]=useState(false)

  const fetchAllTopBrands=async()=>{
    setLoading(true)
    var result=await postData('brand/brandfilltop')
    //alert(JSON.stringify(result))
    //console.log(result.data)
        if(result)
        {
          setTopBrand(result)
        }
        else{
          alert('Invalid Password/Email/Mobile')
        }
setLoading(false)
    }
    useEffect(()=>{
  fetchAllTopBrands()
    },[])
 
 
  const ShowCards = ({item}) => (
    <TouchableOpacity  activeOpacity={0.7} style={{padding: 3}}
    onPress={() =>
      navigation.navigate('ProductListing', {brdid: item.brandid})
    }
    >
      <View
        style={{
          height: height * 0.32,
          borderWidth: 1,
          borderColor: 'rgba(40,44,63,0.10)',}}>
        <View style={{height: height * 0.22}}>
          <Image
            source={{uri:`${ServerURL}/images/${item.picture}`}}
            style={{resizeMode: 'contain', width: width * 0.43, height: '100%'}}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 15}}>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 14, color: '#000', fontWeight: 500}}>
            {item.brandname}
          </Text>
          <Text style={{fontFamily:'Lato-BoldItalic',color: 'rgba(40, 44, 63, 0.5)', fontWeight: 500,}}>
            {item.description.slice(0,15)}
           
          
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={{padding: 18}}>
        <Text style={{fontFamily:'Lato-BoldItalic',color: '#535766', fontSize: 16, fontWeight: 'bold'}}>
          CONTINUE BROWSING THESE BRANDS
        </Text>
      </View>
<View>
   {loading?(
 <View style={{flexDirection:'row',width:width*1}}>

 <View>
 <View style={{width:width*0.43,height:height * 0.26,padding:10}}>
  <ShimmerPlaceorder
  duration={1000}
  stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
  style={{width:width*0.4,height:height*0.25,}}
  />
  </View>
  
  <View style={{width:width*0.43,height:height*0.02,padding:10}}>
  <ShimmerPlaceorder
  duration={1000}
  stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
  style={{width:width*0.4,height:height*0.015,}}
  />
  </View>
  
  <View style={{width:width*0.2,height:height*0.02,padding:10}}>
  <ShimmerPlaceorder
  duration={1000}
  stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
  style={{width:width*0.3,height:height*0.02,}}
  />
  </View>
  
  </View>
  
  <View>
 
 <View style={{width:width*0.43,height:height * 0.26,padding:10}}>
 <ShimmerPlaceorder
 duration={1000}
 stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
 style={{width:width*0.4,height:height*0.25,}}
 />
 </View>
 
 <View style={{width:width*0.43,height:height*0.02,padding:10}}>
 <ShimmerPlaceorder
 duration={1000}
 stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
 style={{width:width*0.4,height:height*0.015,}}
 />
 </View>
 
 <View style={{width:width*0.2,height:height*0.02,padding:10}}>
 <ShimmerPlaceorder
 duration={1000}
 stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
 style={{width:width*0.3,height:height*0.02,}}
 />
 </View>
 
 </View>
  
 <View>
 
  <View style={{width:width*0.1,height:height * 0.26,padding:10}}>
  <ShimmerPlaceorder
  duration={1000}
  stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
  style={{width:width*0.1,height:height*0.25,}}
  />
  </View>
  
  <View style={{width:width*0.1,height:height*0.02,padding:10}}>
  <ShimmerPlaceorder
  duration={1000}
  stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
  style={{width:width*0.1,height:height*0.015,}}
  />
  </View>
  
  <View style={{width:width*0.1,height:height*0.02,padding:10}}>
  <ShimmerPlaceorder
  duration={1000}
 stopAutoRun={false}
  shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
  style={{width:width*0.060,height:height*0.02,}}
  />
  </View>
  
  </View>
  



  </View> 
   ):(
<FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topbrand}
        renderItem={({item}) => <ShowCards item={item} />}
        keyExtractor={item => item.brandid}
      />
   )} 
      
    
    </View>
    </SafeAreaView>
  );
}
