import React,{useState,useEffect} from 'react'

import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    View,
    Dimensions,
    TouchableOpacity
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
import { getData,postData,ServerURL } from '../Services/FetchNodeServices';
  const {width, height} = Dimensions.get('window');
  import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

export default function TrendingBrand({}) {
  const [loading,setLoading]=useState(false)

  const navigation=useNavigation()
const[brand,setBrand]=useState([])
const ShimmerPlaceholder=createShimmerPlaceholder(LinearGradient)

  const fetchAllBrands=async()=>{
    setLoading(true)
    var result=await postData('brand/brandfillnew')
    //alert(JSON.stringify(result))
    //console.log(result.data)
        if(result)
        {
          setBrand(result)
        }
        else{
          alert('Invalid Password/Email/Mobile')
        }
        setLoading(false)
    }
    useEffect(()=>{
  fetchAllBrands()
    },[])
 
      const ShowCards = ({item}) => (
        <TouchableOpacity  activeOpacity={0.7}
        onPress={() =>
      navigation.navigate('ProductListing', {brdid: item.brandid})
    }
         style={{padding: 1}}>
          <View style={{
              height: height * 0.21,
              width: width * 0.33,
              alignItems:'center',
               backgroundColor:'rgb(247, 247, 247)',}}>
            <View style={{height: height * 0.2}}>
              <Image
                source={{uri:`${ServerURL}/images/${item.picture}`}}
                style={{resizeMode: 'contain',borderRadius:10, width: width * 0.29, height: '100%',margin:3,backgroundColor:'#fff'}}
              />
            </View>
            
          </View>
        </TouchableOpacity>
      );
    
      return (
        <SafeAreaView>
          {loading ? (
             <View style={{ backgroundColor: '#fff'}}>
             <View
               style={{flexDirection: 'row', padding: 5,alignSelf:'center'}}>
               <View>
                   <View style={{flexDirection:'row',padding:5}}>
                   <View
                     style={{backgroundColor: '#fff' }}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10,
    
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                 </View>
                 <View style={{flexDirection:'row',padding:5}}>
                   <View
                     style={{backgroundColor: '#fff' }}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10,
    
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                 </View>
                 <View style={{flexDirection:'row',padding:5}}>
                   <View
                     style={{backgroundColor: '#fff' }}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10,
    
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                 </View>
                 <View style={{flexDirection:'row',padding:5}}>
                   <View
                     style={{backgroundColor: '#fff' }}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10,
    
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                 </View>
                 <View style={{flexDirection:'row',padding:5}}>
                   <View
                     style={{backgroundColor: '#fff' }}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10,
    
                       }}
                     />
                   </View>
                   <View
                     style={{backgroundColor: '#fff', alignSelf: 'flex-start',marginLeft:25}}>
                     <ShimmerPlaceholder
                       stopAutoRun={false}
                       duration={0}
                       shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                       style={{
                         width: width * 0.25,
                         height: 130,
                         paddingTop: 5,
                         marginTop: 10,
                         borderRadius:10
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
                  paddingTop: 18,
                  paddingBottom: 18,
                  paddingLeft: 10,
                  backgroundColor: '#fff',
                }}>
                <Text style={{fontFamily:'Lato-BoldItalic',color: '#535766', fontSize: 16, fontWeight: 'bold'}}>
                  TRENDING BRANDS
                </Text>
              </View>
              <FlatList
                numColumns={3}
                data={brand}
                renderItem={({item}) => <ShowCards item={item} />}
                keyExtractor={item => item.brandid}
                style={{
                  backgroundColor: '#fff',
                }}
              />
            </View>
          )}
        </SafeAreaView>
      );



}
