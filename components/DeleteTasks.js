import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class DeleteTasks extends Component {


    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.closeIcon} onPress={this.props.closeModal}>
                        <AntDesign name="closecircle" size={25} color="black" />
                    </TouchableOpacity>
                    <AntDesign name="warning" size={65} color="white" style={{marginTop:40}} />
                    <View style={{marginTop:30}}>
                        <Text style={{textAlign:"center",fontWeight:'bold',fontSize:25}}>CAUTION!</Text>
                        <Text style={{textAlign:"center",fontWeight:'bold'}}>All your tasks will be deleted.This action is irreversible.</Text>
                    </View>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={this.props.deleteTasks}

                        >
                            <Text style={styles.buttonsText}>Delete All!</Text>

                        </TouchableOpacity>



                    </View>
                </View>
            </View>


        );
    }



}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',


    },
    menuContainer: {

        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#B33A3A',
        width: '90%',
        height: '40%',
        elevation: 3,


    },
    closeIcon: {
        position: 'absolute',
        top: 15,
        right: 15

    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 45,
        justifyContent: 'space-between',
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 2
    },
    buttonsText: {
        color: '#B33A3A',
        fontSize: 15
    }
})