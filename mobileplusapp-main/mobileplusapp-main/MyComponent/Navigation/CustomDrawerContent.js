import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
const {width, height} = Dimensions.get('window');
import {List} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
// import FA from 'react-native-vector-icons/FontAwesome';

import {ServerURL, getData, postData} from '../Services/FetchNodeServices';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
export default function CustomDrawerContent(props) {
  const [brndByMobile, setBrndByMobile] = useState([]);
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  const userDetailList = useSelector(state => state.userDetails);
  //alert(Object.values(userDetailList).length)
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fetchAllCategory = async () => {
    var result = await getData('pack/category');
    if (result) {
      setCategory(result);

      const obj = result.reduce((acc, i, index) => {
        acc[index] = false;
        return acc;
      }, {});
      setExpanded(obj);
    } else {
      alert('Invalid Password/Email/Mobile');
    }
  };

  const fetchAllBrndByMobile = async id => {
    setLoader(true);
    var result = await postData('brand/brandfill', {categoryid: id});
    if (result) {
      setBrndByMobile(result);
    } else {
      alert('Server Error');
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const handleClick = (id, index) => {
    setExpanded(prev => {
      let obj = {};
      for (let key in prev) {
        obj[key] = false;
      }
      return {...obj, [index]: !prev[index]};
    });
    fetchAllBrndByMobile(id);
  };
  const handleClickLog = () => {
    dispatch({type: 'DELETE_USER'});
  };
  const handleClickSignUp = () => {
    navigation.navigate('LoginPage');
  };
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          display: 'flex',
          paddingTop: 20,
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        {/* <Image
          style={{
            marginBottom: 5,
            borderRadius: 50,
            resizeMode: 'contain',
            width: 100,
            height: 100,
          }}
          source={require('../Assets/profile1.jpg')}
        /> */}
        <Avatar.Image
          style={{backgroundColor: 'red'}}
          size={100}
          source={require('../Assets/profile1.jpg')}
        />
        {Object.values(userDetailList).length ? (
          <>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                fontWeight: 'bold',
                paddingTop: 5,
                color: '#000',
              }}>
              {userDetailList.username}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                paddingTop: 5,
                color: '#000',
              }}>
              +91{userDetailList.mobileno}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                fontSize: 14,
                paddingTop: 5,
                color: '#000',
              }}>
              {userDetailList.emailaddress}
            </Text>
          </>
        ) : (
          <Text style={{fontFamily: 'Lato-BoldItalic'}}>Hi Guest</Text>
        )}
      </View>
      {/* <DrawerItemList {...props} /> */}
      {/* <View>
          <DrawerItem
            label="MOBILES"
            icon={() => <MCI name={'cellphone'} size={24} />}
          /></View>
          <View >
          <MCI name={'cellphone'} size={24} />
          </View> */}

      <List.Section>
        {category.map((item, index) => (
          <List.Accordion
            expanded={expanded[index]}
            style={{
              backgroundColor: '#fff',
              padding: 0,
              paddingLeft: 5,
              paddingRight: 8,
              paddingBottom: 5,
            }}
            theme={{colors: false}}
            containerStyle={{backgroundColor: 'yellow'}}
            titleStyle={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 14,
              fontFamily: 'Lato-BoldItalic',
            }}
            title={item.categoryname}
            left={props => (
              <Image
                {...props}
                style={{
                  width: width * 0.1,
                  height: height * 0.04,
                  resizeMode: 'contain',
                  marginLeft: 10,
                }}
                source={{uri: `${ServerURL}/images/${item.picture}`}}
              />
            )}
            onPress={() => handleClick(item.id, index, expanded[index])}>
            {!loader &&
              brndByMobile.map(item => (
                <List.Item
                  onPress={() =>
                    navigation.navigate('ProductListing', {brdid: item.brandid})
                  }
                  title={item.brandname}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#000',
                    fontFamily: 'Lato-BoldItalic',
                  }}
                  left={props => (
                    <Image
                      {...props}
                      style={{
                        width: width * 0.1,
                        height: height * 0.04,
                        resizeMode: 'contain',
                        marginLeft: 10,
                      }}
                      source={{uri: `${ServerURL}/images/${item.picture}`}}
                    />
                  )}
                />
              ))}
          </List.Accordion>
        ))}
      </List.Section>

      <View>
        <TouchableOpacity
          style={{flexDirection: 'row', paddingLeft: 20, alignItems: 'center'}}>
          <View>
            <MCI name="folder" size={23} color={'#94969f'} />
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                paddingLeft: 15,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#000',
              }}>
              Terms & Condition
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            paddingTop: 18,
            alignItems: 'center',
          }}>
          <View>
            <MCI name="phone-message" size={23} color={'#94969f'} />
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Lato-BoldItalic',
                paddingLeft: 15,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#000',
              }}>
              Contact us
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        {Object.values(userDetailList).length ? (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('DisplayOrder')}
              style={{
                flexDirection: 'row',
                paddingLeft: 20,
                paddingTop: 18,
                alignItems: 'center',
              }}>
              <View>
                <MCI name="cart-variant" size={23} color={'#94969f'} />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Lato-BoldItalic',
                    paddingLeft: 15,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  My Orders
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 17,
                paddingTop: 18,
              }}>
              <View>
                <MCI name="account-key" size={23} color={'#94969f'} />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Lato-BoldItalic',
                    paddingLeft: 16,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleClickLog()}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 22,
                paddingTop: 18,
              }}>
              <View>
                <MCI name="logout" size={23} color={'#94969f'} />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Lato-BoldItalic',
                    paddingLeft: 14,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleClickSignUp()}
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              paddingTop: 18,
              alignItems: 'center',
            }}>
            <View>
              <MCI name="login" size={23} color={'#94969f'} />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Lato-BoldItalic',
                  paddingLeft: 15,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </DrawerContentScrollView>
  );
}
