import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default class AddData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            importance: '',
            date: ''


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
        const { title, description, importance } = this.state;
        const task = { title, description, importance };
        this.props.addTask(task)
        this.props.closeModal();
    }

    render() {
        const Reminder = () => {
            if (this.state.importance === '') {
                return (
                    <Text>Please select the level of importance</Text>
                );
            } else if (this.state.importance === '1') {
                return (
                    <Text>This task will not be remided</Text>
                );
            } else if (this.state.importance === '2') {
                return (
                    <Text>A simple notification will pop-up</Text>
                );
            }
            else if (this.state.importance === '3') {
                return (
                    <Text>Your phone will ring</Text>
                );

            }
        }
        return (

            <View style={styles.mainContainer}>
                <View style={styles.menuContainer}>
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
                    <Reminder />
                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={() => { this.createTask() }}

                        >
                            <Text style={styles.buttonsText} >Add</Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={this.props.closeModal}


                        >
                            <Text style={styles.buttonsText}>Cancel</Text>

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
        width: '90%',
        height: '95%',
        elevation: 3,
        flexBasis: '65%'


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
        elevation:2
    },
    buttonsText: {
        color: 'white',
        fontSize: 15

    },
    menuHeader: {
        fontWeight: 'bold',
        fontSize: 25,

    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20,

    },
    buttonsContainer: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
},
});