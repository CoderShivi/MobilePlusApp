import {View, Text, Dimensions, Button,TouchableOpacity} from 'react-native';
import React from 'react';
import FR from 'react-native-vector-icons/Feather';
import AT from 'react-native-vector-icons/AntDesign';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import MICON from 'react-native-vector-icons/MaterialIcons';

export default function Account() {
  const {width, height} = Dimensions.get('window');
  return (
    <View style={{flex: 1, width: width}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          borderBottomWidth: 0.5,
          paddingBottom: 20,
          borderBottomColor: '#d4d5d9',
          backgroundColor: '#fff',
        }}>
        <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 16, fontWeight: 600, color: '#000'}}>
          <Text>Hey! </Text>
          <Text>Vishal </Text>
          <Text>Jain</Text>
        </Text>
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1.8,
              borderColor: '#f2f2f2',
              paddingLeft: 20,
              paddingRight: 65,
              padding: 10,
              borderRadius: 3,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FR color="#2874f0" size={18} name="package" />
            <Text
              style={{fontFamily:'Lato-BoldItalic',
                color: '#000',
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: 15,
                marginLeft: 10,
              }}>
              Orders
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1.8,
              borderColor: '#f2f2f2',
              paddingLeft: 20,
              paddingRight: 65,
              padding: 10,
              borderRadius: 3,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AT color="#2874f0" size={18} name="hearto" />

            <Text
              style={{fontFamily:'Lato-BoldItalic',
                color: '#000',
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: 15,
                marginLeft: 10,
              }}>
              Wishlist
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1.8,
              borderColor: '#f2f2f2',
              paddingLeft: 20,
              paddingRight: 50,
              padding: 10,
              borderRadius: 3,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FR color="#2874f0" size={18} name="gift" />
            <Text
              style={{fontFamily:'Lato-BoldItalic',
                color: '#000',
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: 15,
                marginLeft: 10,
              }}>
              Coupons
            </Text>
          </View>

          <View
            style={{fontFamily:'Lato-BoldItalic',
              borderWidth: 1.8,
              borderColor: '#f2f2f2',
              paddingLeft: 20,
              paddingRight: 37,
              padding: 10,
              borderRadius: 3,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MI color="#2874f0" size={18} name="headset" />

            <Text
              style={{fontFamily:'Lato-BoldItalic',
                color: '#000',
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: 15,
                marginLeft: 10,
              }}>
              Help Center
            </Text>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
        <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 16, fontWeight: 600, color: '#000'}}>
          Account Settings
        </Text>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AT color="#2874f0" name="user" size={25} />
              <Text style={{fontFamily:'Lato-BoldItalic',marginLeft: 20, fontSize: 16, color: '#000'}}>
                Edit Profile
              </Text>
            </View>

            <MICON color="#000" size={25} name="keyboard-arrow-right" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AT color="#2874f0" name="wallet" size={25} />
              <Text style={{fontFamily:'Lato-BoldItalic',marginLeft: 20, fontSize: 16, color: '#000'}}>
                Saved Cards & Wallet
              </Text>
            </View>

            <MICON size={25} color="#000" name="keyboard-arrow-right" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MICON color="#2874f0" name="location-on" size={25} />
              <Text style={{fontFamily:'Lato-BoldItalic',fontFamily:'Lato-BoldItalic',marginLeft: 20, fontSize: 16, color: '#000'}}>
                Saved Addresses
              </Text>
            </View>

            <MICON size={25} color="#000" name="keyboard-arrow-right" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MICON color="#2874f0" name="translate" size={25} />
              <Text style={{fontFamily:'Lato-BoldItalic',marginLeft: 20, fontSize: 16, color: '#000'}}>
                Select Language
              </Text>
            </View>

            <MICON color="#000" size={25} name="keyboard-arrow-right" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MICON color="#2874f0" name="notifications-none" size={25} />
              <Text style={{fontFamily:'Lato-BoldItalic',fontFamily:'Lato-BoldItalic',marginLeft: 20, fontSize: 16, color: '#000'}}>
                Notification Settings
              </Text>
            </View>

            <MICON color="#000" size={25} name="keyboard-arrow-right" />
          </View>
        </View>
      </View>
      <View style={{backgroundColor: '#fff', padding: 10, marginTop: 10}}>
        <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 16, fontWeight: 600, color: '#000'}}>
          Feedback & Information
        </Text>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MI color="#2874f0" name="file-document-outline" size={25} />
              <Text style={{fontFamily:'Lato-BoldItalic',marginLeft: 20, fontSize: 16, color: '#000'}}>
                Terms, Policies and Licenses
              </Text>
            </View>

            <MICON color="#000" size={25} name="keyboard-arrow-right" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AT color="#2874f0" name="questioncircleo" size={25} />
              <Text style={{fontFamily:'Lato-BoldItalic',fontFamily:'Lato-BoldItalic',fontFamily:'Lato-BoldItalic',marginLeft: 20, fontSize: 16, color: '#000'}}>
                Browse FAQs
              </Text>
            </View>

            <MICON size={25} color="#000" name="keyboard-arrow-right" />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 30,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 7,
          justifyContent: 'center',
          alignSelf: 'center',
          width: width * 0.9,
          borderRadius:4,
          borderWidth:1,
          borderColor:'#dfe4ea',
          
        }}>
        <Text
          style={{fontFamily:'Lato-BoldItalic',
            color: '#3B3B98',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}>
          {' '}
          Log Out{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
