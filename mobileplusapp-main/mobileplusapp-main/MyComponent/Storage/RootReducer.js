const initialState = {
  product: {},
  userDetails:{},
  address:{},
  prices:[],
  pincode:[]
};
export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
     //console.log("amil======>",action.payload[0]);
      state.product[action.payload[0]] = action.payload[1];
     //console.log('ADD_PRODUCT:', state.product);
      return { ...state, product: state.product };


    case 'REMOVE_PRODUCT':
      delete state.product[action.payload];
      return { ...state, product: state.product };


      case 'DELETE_PRODUCT':
        state.product={};
       // console.log('DELETE_PRODUCT:', state.product);
        return { ...state, product: state.product };


        case 'ADD_PRICES':
          //console.log("prices",action.payload);
          state.prices = action.payload;
         //console.log('ADD_PRICES:', state.prices);
          return { ...state, prices: state.prices };

            case 'REMOVE_PRICES':
           state.prices=[];
          // console.log('REMOVE_PRICES:', state.prices);
           return { ...state, prices: state.prices };

          case "ADD_USER":
           // console.log("userDetails",action.payload);
            state.userDetails = action.payload;
           // console.log('ADD_USER:', state.userDetails);
            return { ...state, userDetails: state.userDetails };
           
            case "DELETE_USER":
              state.userDetails = {};
              return { ...state, userDetails: state.userDetails };

              case "ADD_ADDRESS":
            console.log("address",action.payload);
            state.address = action.payload;
           console.log('ADD_ADDRESS:', state.address);
            return { ...state, address: state.address };

            case "DELETE_ADDRESS":
              state.address = {};
              return { ...state, address: state.address };
             
              case 'ADD_PINCODE':
                console.log("PINCODE",action.payload);
                state.pincode = action.payload;
               console.log('ADD_PINCODE:', state.pincode);
                return { ...state, pincode: state.pincode };
               
                case "DELETE_PINCODE":
                  state.pincode = [];
                  return { ...state, pincode: state.pincode };
    

                default:
          return state;
     
  }
}
