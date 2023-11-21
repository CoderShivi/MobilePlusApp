import React, {useState, useEffect} from 'react';
import {getData, ServerURL} from '../Services/FetchNodeServices';
import {
  FlatList,
  Image,
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

export default function Category({}) {
  const ShimmerPlaceorder = createShimmerPlaceholder(LinearGradient);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchAllCategory = async () => {
    setLoading(true);
    var result = await getData('pack/category');
    //alert(JSON.stringify(result))
    //console.log(result.data)
    if (result) {
      setCategory(result);
    } else {
      alert('Invalid Password/Email/Mobile');
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAllCategory();
  }, []);

  const Showcategory = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductListing', {cid: item.id})}
      activeOpacity={0.7}>
      <View
        style={{
           paddingTop: 15,
          backgroundColor: '#fff',
          height: height * 0.18,
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            source={{uri: `${ServerURL}/images/${item.picture}`}}
            style={{backgroundColor:'#fff',resizeMode: 'contain', width: width * 0.2, height: height*0.12}}
          />
        </View>
        
        <View style={{justifyContent:'center',backgroundColor: '#fff', height: height * 0.040}}>
          <Text
            numberOfLines={2}
            style={{
              width: width * 0.2,
              textAlign: 'center',
              fontWeight: 500,
              color: '#282c3f',
              fontSize: 10,
              fontFamily:'Lato-BoldItalic',
            }}>
            {item.categoryname}
          </Text>
        </View>
     
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      {loading ? (
        <View style={{flexDirection: 'row', width: width * 1}}>
          <View>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.1,
                  borderRadius: 50,
                }}
              />
            </View>

            <View
              style={{width: width * 0.2, height: height * 0.035, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>

          <View style={{paddingLeft: 20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.1,
                  borderRadius: 50,
                }}
              />
            </View>

            <View
              style={{width: width * 0.2, height: height * 0.035, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>

          <View style={{paddingLeft: 20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.1,
                  borderRadius: 50,
                }}
              />
            </View>

            <View
              style={{width: width * 0.2, height: height * 0.035, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>

          <View style={{paddingLeft: 20}}>
            <View
              style={{width: width * 0.2, height: height * 0.12, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.1,
                  borderRadius: 50,
                }}
              />
            </View>

            <View
              style={{width: width * 0.2, height: height * 0.035, padding: 10}}>
              <ShimmerPlaceorder
                duration={1000}
                stopAutoRun={false}
                shimmerColors={['#ebebeb', '#ebebeb', '#ebebeb']}
                style={{
                  width: width * 0.2,
                  height: height * 0.03,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={category}
          renderItem={({item}) => <Showcategory item={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}
