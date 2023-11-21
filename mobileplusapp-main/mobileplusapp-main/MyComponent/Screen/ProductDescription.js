import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Unorderedlist from 'react-native-unordered-list';
import RenderHTML from 'react-native-render-html';

export default function ProductDescription({product}) {
  const {width, height} = Dimensions.get('window');
//alert(JSON.stringify(product))
  return (
    <View style={{padding: 10, backgroundColor: '#fff', width: width,height:'auto'}}>
      <Text
        style={{fontFamily:'Lato-BoldItalic',
          fontSize: 14,
          color: '#282c3f',
          fontWeight: 'bold',
          letterSpacing: 0.5,
        }}>
        Product Details
      </Text>
      <Text
        style={{fontFamily:'Lato-BoldItalic',
          color: '#7e808c',
          fontSize: 12,
          marginTop: 10,
          letterSpacing: 0.5,
        }}>
       {product.productname}
      </Text>
      <Text
        style={{fontFamily:'Lato-BoldItalic',
          fontSize: 14,
          color: '#282c3f',
          fontWeight: 'bold',
          letterSpacing: 0.5,
          marginTop: 20,
        }}>
        Features:
      </Text>
<View >
<RenderHTML source={{html: product.description}}  />
 </View>
   </View>
  );
}
