import React from 'react';
import { StyleSheet, Text, View } from 'react-native';





export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>To<Text style={styles.do}>do</Text></Text>

        </View>


    );
}

const styles = StyleSheet.create({
    header: {
     height:80,
     paddingTop:35,
     backgroundColor:'coral',
    },
    title:{
        textAlign:'center',
        fontSize:25,
        color:'white',
        fontWeight:'bold',
        letterSpacing:4
    },
    do:{
        color:'black'
    }
  });