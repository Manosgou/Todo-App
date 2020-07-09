import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default class AddData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            importance:'',
            date: '',
            

        };


    }

    handleInputChange = (inputName, inputValue) => {
        if (inputValue != "0") {
            this.setState(state => ({
                ...state,
                [inputName]: inputValue
            }))
        }
    }


    createTask() {
        const { title, description,importance} = this.state;
        if (title.trim() != "") {
            if (description.trim() != "") {
                if (importance != "") {
                    const task = { title, description,importance};
                    this.props.addTask(task);
                    this.props.closeModal();

                } else {
                    alert("You must set the importance level of the task.")
                }
            } else {
                alert("You must add a description to your task.")
            }
        } else {
            alert("You must add a title to your task.")
        }



    }

    render() {
       
        return (

            <View style={styles.mainContainer}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.closeIcon} onPress={this.props.closeModal}>
                        <AntDesign name="closecircle" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.menuHeader}>Add Task</Text>
                    <Text>Title</Text>
                    <TextInput
                        placeholder="e.x Go to the market"
                        style={styles.textInput}
                        onChangeText={value => this.handleInputChange('title', value)}

                    />
                    <Text>Description</Text>
                    <TextInput
                        placeholder="e.x Grab some milk"
                        style={styles.textInput}
                        onChangeText={value => this.handleInputChange('description', value)}


                    />

                    <Text>Importance</Text>
                    <Picker
                        defaultValue='test'
                        selectedValue={this.state.importance || ''}
                        style={{ height: 50, width: 220 }}
                        onValueChange={value => this.handleInputChange('importance', value)}>
                        <Picker.Item label="Level of importance" value="0" color="grey" />
                        <Picker.Item label="Least important" value="1" />
                        <Picker.Item label="Less important" value="2" />
                        <Picker.Item label="Most important" value="3" />
                    </Picker>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={() => { this.createTask() }}

                        >
                            <Text style={styles.buttonsText} >Add</Text>

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
        justifyContent: 'space-evenly',
        borderRadius: 30,
        backgroundColor: 'white',
        width: '95%',
        height: '95%',
        elevation: 3,
        flexBasis: '85%'


    },
    textInput: {
        borderBottomWidth: 0.3,
        borderColor: 'coral',
        width: '80%'
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
        backgroundColor: 'coral',
        borderRadius: 50,
        elevation: 2
    },
    buttonsText: {
        color: 'white',
        fontSize: 15

    },
    menuHeader: {
        fontWeight: 'bold',
        fontSize: 30,

    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20,

    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
    },
    closeIcon: {
        position: 'absolute',
        top: 15,
        right: 15

    }
});