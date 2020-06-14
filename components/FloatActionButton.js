import React, { Component } from 'react';
import {StyleSheet,View,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default class FloatActionButton extends Component{
    
    render(){
        if (this.props.buttonState) {
            return null;
      
          } else {
            return (
              <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fab} onPress={this.props.onFABPress} >
                  <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
              </View>
            );
          }
    }
    

}
  const styles =StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5
      },
    
      fab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: 'coral',
        borderRadius: 50,
      },
  })