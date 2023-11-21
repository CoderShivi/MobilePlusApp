import React from 'react';
import {Text, View, Dimensions, ToastAndroid} from 'react-native';
import AppButton from './AppButton';
import Smp from 'react-native-vector-icons/SimpleLineIcons'
import Ant from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

export default function AddTobag({handleClickAutoFocus,checkPinState,handleAddtoCart,product}) {
  const pincodeData = useSelector(state => state.pincode[0]);

  return (<View style={{backgroundColor:'#fff'}}>

<View style={{paddingLeft:10}}>
<View>
    <Text style={{fontFamily:'Lato-BoldItalic',fontFamily:'Lato-BoldItalic',fontSize:15,fontWeight:700,color:'#000'}}>Add To Cart</Text>
</View>

 <View style={{flexDirection:'row',paddingTop:4,alignItems:'center'}} >
 <Text style={{fontSize:14,fontWeight:700,color:'#000'}}>₹&nbsp;{product.offerprice}</Text><Text style={{paddingLeft:10,color:'#94969f'}}>₹</Text><Text style={{textDecorationLine: 'line-through',color:'#94969f'}}>&nbsp;{product.price}</Text><Text style={{color:'#ff3f6c',paddingLeft:4}}>(Rs.{parseInt(product.price-product.offerprice)} OFF)</Text>
</View>
<View style={{flexDirection:'row',}}>
    <Text style={{fontFamily:'Lato-BoldItalic',color:'#94969f'}}>Seller :</Text><Text style={{fontFamily:'Lato-BoldItalic',color:'#ff3f6c',paddingLeft:4}}>Supercom Net</Text>
</View>
</View>
    <View
    style={{
      marginTop: 8,
      elevation: 1,
    }}>
   <View>


   </View>
   
   
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
      }}>
      <View>
      
       <View>
       <AppButton fnwth={400} borderRadii={0.1} btnWidth={0.42} buttonText={'WISHLIST'} bgcolor='#fff' plft={25} Inputcolor='#000' borderwdth={1}  brdcolor={'rgba(40,44,63,0.10)'} />
       </View>
       <View style={{position:'absolute', top:22,left:30}}>
      <Ant name="hearto" size={17} color={'#000'} />
      </View>
      </View>
      <View>

      {
      checkPinState =='Delivery Available in Your Area'|| pincodeData?.pincode ?(
       <AppButton onPress={handleAddtoCart} fnwth={400} borderRadii={0.1} btnWidth={0.5} buttonText={'ADD TO BAG'} bgcolor='#ff3f6c'  plft={25} />

      ):(
        <AppButton onPress={handleClickAutoFocus} fnwth={400} borderRadii={0.1} btnWidth={0.5} buttonText={'Check Pincode'} bgcolor='#ff3f6c'  plft={25} />

      )}
       <View style={{position:'absolute', top:20,left:35}}>
       <Smp name="handbag" size={17} color={'#fff'} />

      </View>
       </View>
    </View>
  </View>
  </View> )
}
