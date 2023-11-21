import {Dimensions, Image, Text, View,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { ServerURL, getData } from '../Services/FetchNodeServices';
const {width, height} = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';

export default function Banner() {
  const [index, setIndex] = React.useState(0);
  const[banner,setBanner]=useState([])
  const[loading,setLoading]=useState(false)
const navigation=useNavigation()
  const ShimmerPlaceorder=createShimmerPlaceholder(LinearGradient)

  const isCarousel = React.useRef(null);

  const fetchAllBanners=async()=>{
    setLoading(true)
  var result=await getData('productads/displayjson')
  //alert(JSON.stringify(result.data))
  //console.log(result.data)
      if(result)
      { 
        setBanner(result.data)
      }
      else{
        alert('Invalid Password/Email/Mobile')
      }
setLoading(false)
  }
  useEffect(()=>{
fetchAllBanners()
  },[])



  const _renderItem = ({item, index}) => {
    return (<TouchableOpacity onPress={()=>navigation.navigate('ProductDeatailsOne',{id:item.productid})}
    activeOpacity={0.7}
    >
        <Image
          style={{width: width, height: height * 0.20,resizeMode:'stretch'}}
          source={{uri:`${ServerURL}/images/${item.bannerpicture}`}}
        />

        </TouchableOpacity>
    );
  };

  return (
    <View>
      {loading?
      (
    <View style={{flexDirection:'row',width:width}}>
   <View style={{width: width, height: height * 0.20}}>
   <ShimmerPlaceorder
   duration={1000}
   stopAutoRun={false}
   shimmerColors={['#ebebeb', '#ebebeb','#ebebeb']}
   style={{width: width, height: height * 0.20}}
   /></View>
      </View>
        
      ):(
      <View>
         <Carousel
        ref={isCarousel}
        data={banner}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        useScrollView={true}
        layout="default"
        autoplay={true}/>
      </View>
      )}
     
    </View>
  );
}
