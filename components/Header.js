import React, { Component } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';





export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>To<Text style={{ color: 'black' }}>do</Text></Text>
                <TouchableOpacity style={styles.trashIcon} onPress={this.props.deleteTasks}>
                    <FontAwesome5 name="trash-alt" size={24} color="black" />
                </TouchableOpacity>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 75,
        paddingTop: 10,
        backgroundColor: '#D95525',
    },
    title: {
        textAlign: 'center',
        fontSize: 45,
        color: 'white',
        letterSpacing: 4,
        fontFamily: 'Lobster',
        marginTop: 8

    },
    trashIcon: {
        position: 'absolute',
        right: 15,
        top: 40


    }
});