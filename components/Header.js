import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';





export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>To<Text style={{color: 'black'}}>do</Text></Text>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 35,
        backgroundColor: 'coral',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 4
    },
});