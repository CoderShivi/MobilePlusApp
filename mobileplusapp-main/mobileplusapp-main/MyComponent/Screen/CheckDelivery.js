import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState,useRef,useLayoutEffect} from 'react';
import {postData} from '../Services/FetchNodeServices';
import {useDispatch,useSelector} from 'react-redux';

export default function CheckDelivery({
  props,
  handlecCheckpincode,
  mstate,
  mcolor,
  handleClickFalse,
  disabled,
  checkFocus
}) {
  const {width, height} = Dimensions.get('window');
 // const [chF,setChF]=useState(checkFocus)
  const pincodeData = useSelector(state => state.pincode[0]);
  const inputRef = useRef()
console.log(checkFocus)
  const [pincode, setPincode] = useState(pincodeData?pincodeData.pincode:'');
 useEffect(()=>{
  if(checkFocus==true){
    inputRef.current.focus()
  }
 },[checkFocus])

  return (
    <View style={{padding: 10, backgroundColor: '#fff', width: width,height:height*0.19}}>
      <Text
        style={{
          fontSize: 18,
          color: '#282c3f',
          fontWeight: 'bold',
          letterSpacing: 0.5,
        }}>
        Check Delivery
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 0.5,
          borderRadius: 3,
          borderColor: '#bfc0c6',
          backgroundColor: '#fff',
          marginTop: 20,
          padding: 4,
       
        }}>
        <TextInput
          maxLength={6}
          // autoFocus={checkFocus =='true'?true:false}
         ref={inputRef}
          keyboardType="numeric"
          value={pincode}
          onChangeText={txt => setPincode(txt.trim())}
          placeholderTextColor={'#FF3F6C'}
          placeholder="Enter PIN Code"
          selectionColor={'#FF3F6C'}
          onFocus={() => handleClickFalse()}
          style={{paddingLeft: 10, color: '#424242', padding: 0,width:width*0.7}}
        />
        {disabled?(
   <View
  // onPress={() => handlecCheckpincode(pincode)}
   style={{padding: 12}}>
   <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing: 2, fontWeight: 700,color:'#94969f'}}>
     CHECK
   </Text>
 </View>
        ):(
<TouchableOpacity
          onPress={() => handlecCheckpincode(pincode)}
          style={{padding: 12}}>
          <Text style={{fontFamily:'Lato-BoldItalic',letterSpacing: 2, color: '#FF3F6C', fontWeight: 700}}>
            CHECK
          </Text>
        </TouchableOpacity>
        )}
        
</View>
<Text
        style={{paddingTop:8,
          color: mcolor,
        //  marginBottom: 4,
          fontSize: 12,
          fontFamily:'Lato-BoldItalic',
          //marginTop: 20,
        }}>
        {mstate}
      </Text>

      
    </View>
  );
}
