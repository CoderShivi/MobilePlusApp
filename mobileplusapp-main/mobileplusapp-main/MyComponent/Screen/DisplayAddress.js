import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
import Ant from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
export default function DisplayAddress() {
  const navigation = useNavigation();

  const Address = [
    {
      id: '1',
      name: 'Mukesh',
      address:
        'Subash Nagar a b road colony bahodapur near Ganesh bagh gwalior',
      locality: 'S.P.Ashram',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
      pincode: '474012',
    },
    {
      id: '2',
      name: 'Mukesh',
      address:
        'subash nagar a b road colony bahodapur near Ganesh bagh gwalior',
      locality: 'S.P.Ashram',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
      pincode: '474012',
    },
    {
      id: '3',
      name: 'Mukesh',
      address:
        'subash nagar a b road colony bahodapur near Ganesh bagh gwalior',
      locality: 'S.P.Ashram',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
      pincode: '474012',
    },
    {
      id: '4',
      name: 'Mukesh',
      address:
        'Subash Nagar A B road colony bahodapur near Ganesh bagh gwalior',
      locality: 'S.P.Ashram',
      city: 'Gwalior',
      state: 'Madhya Pradesh',
      pincode: '474012',
    },
  ];
  const Item = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFF',
        width: width,
        height: height * 0.3,
        padding: 10,
        marginBottom: 10,
      }}>
      <View style={{width: width * 0.1}}>
        <CheckBox
          boxType="circle"
          tintColors={{true: '#FF3F6C', false: '#000'}}
          disabled={false}
          value={true}
          onValueChange={!true}
        />
      </View>
      <View style={{width: width * 0.85, marginTop: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily:'Lato-BoldItalic',fontSize: 14, fontWeight: 'bold', color: '#000'}}>
            {item.name}
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'green',
              padding: 4,
              borderRadius: 20,
            }}>
            <Text style={{fontFamily:'Lato-BoldItalic',color: 'green', fontWeight: 'bold', fontSize: 10}}>
              Home
            </Text>
          </View>
        </View>
        <View>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 13, marginTop: 5}}>
            {item.address}
          </Text>
        </View>
        <View>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 13, marginTop: 3}}>
            {item.locality}
          </Text>
        </View>
        <View>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 13, marginTop: 3}}>
            {item.city},{item.state} {item.pincode}
          </Text>
        </View>
        <View>
          <Text style={{fontFamily:'Lato-BoldItalic',color: '#000', fontSize: 13, marginTop: 10}}>
            Mobile:7724846960
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              borderWidth: 1,
              borderColor: '#000',
              width: width * 0.2,
              padding: 5,
              borderRadius: 5,
            }}>
            <Text
              style={{fontFamily:'Lato-BoldItalic',alignSelf: 'center', fontWeight: 'bold', color: '#000'}}>
              REMOVE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              borderWidth: 1,
              borderColor: '#000',
              width: width * 0.18,
              padding: 5,
              borderRadius: 5,
              marginLeft: 20,
            }}>
            <Text
              style={{fontFamily:'Lato-BoldItalic',alignSelf: 'center', fontWeight: 'bold', color: '#000'}}>
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15,
          backgroundColor: '#fff',
        }}>
        <Ant color="#282c3f" name="arrowleft" size={25} />

        <Text
          style={{
            fontFamily:'Lato-BoldItalic',
            color: '#424553',
            fontSize: 16,
            fontWeight: 600,
            marginLeft: 16,
          }}>
          SELECT ADDRESS
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={{backgroundColor: '#fff', padding: 10}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{borderWidth: 1, borderColor: '#000', padding: 10}}>
            <Text
              style={{fontFamily:'Lato-BoldItalic',alignSelf: 'center', fontWeight: 'bold', color: '#000'}}>
              ADD NEW ADDRESS
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 20}}>
          <Text style={{fontWeight: 'bold'}}>SELECT ADDRESS</Text>
        </View>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            //   horizontal={true}
            showsVerticalScrollIndicator={true}
            data={Address}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.25,
        }}>
        <TouchableOpacity style={{backgroundColor: '#FF3F6C', padding: 15}}>
          <Text
            style={{alignSelf: 'center', fontWeight: 'bold', color: '#fff'}}>
            CONFIRM
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
