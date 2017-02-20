// obtained from react native tutorials

import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    rem:Dimensions.get('window').width/750
  },
  fetchFun(url, data, callback) {
    const fetchOptions = {
      method: "post",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'customToken':'a6566c0d5a524942b476e8ca29d65334'
      },
      body:JSON.stringify(data)
    };
    //

    fetch(url, fetchOptions)
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      callback(responseData);
    }).catch((error)=>{
        callback(error+"错误");
    })
  },
  fetchFunGet(url, callback) {
    const fetchOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'customToken':'a6566c0d5a524942b476e8ca29d65334'
      }
    };
    //

    fetch(url, fetchOptions)
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      callback(responseData);
    }).catch((error)=>{
        callback(error+"错误");
    })
  },

  key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;
