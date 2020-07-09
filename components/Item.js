import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Picker, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFinished: false,


        }

    }
    finishTask(id) {
        this.setState({ isFinished: !this.state.isFinished })
        this.props.finishTask(id, this.state.isFinished);




    }

    componentDidMount() {
        let isFinished = this.props.taskIsFinished(this.props.id);
        this.setState({ isFinished })
    }




    render() {

        if (this.state.isFinished) {

                return (
                    <View style={[styles.task, { backgroundColor: "grey" }]}>


                        <Text style={[styles.taskTitle, { color: "white" }, { textDecorationLine: "line-through" }]} >{this.props.title}</Text>
                        <Text style={{ color: 'white', textDecorationLine: "line-through" }}>{this.props.description}</Text>
                        <Text style={[styles.taskImportance, { color: "white" }, { textDecorationLine: "line-through" }]}>Importance:<Text>{this.props.importance}</Text></Text>
                        <Text style={[styles.taskCreated, { color: "white" }, { textDecorationLine: "line-through" }]}>Created:<Text>{this.props.created}</Text></Text>
                        <View style={styles.iconsContainer}>
                            <View style={styles.icons}>
                                <TouchableOpacity onPress={() => this.finishTask(this.props.id)}>

                                    <MaterialIcons name="undo" size={27} color="white" />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.deleteTask(this.props.id)}>
                                    <MaterialIcons name="delete" size={27} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            
        } else {
            return (
                <View style={[styles.task, { backgroundColor: "coral" }]}>


                    <TextInput placeholder="Insert a title" placeholderTextColor="#202020" maxLength={27} style={[styles.taskTitle, { color: "black" }, { textDecorationLine: 'none' }]} value={this.props.title} onChangeText={value => this.props.onTitleChange(value, this.props.id)} />
                    <TextInput placeholder="Insert a description" placeholderTextColor="#202020" multiline={true} numberOfLines={3} style={{ color: "black" }, { textDecorationLine: 'none' }} value={this.props.description} onChangeText={value => this.props.onDescriptionChange(value, this.props.id)} />
                    <Picker
                        selectedValue={this.props.importance}
                        style={{ height: 50, width: 220 }}
                        onValueChange={value => this.props.onImportanceChange(value, this.props.id)}>
                        <Picker.Item label="Level of importance" value="0" color="#4C4C4C" />
                        <Picker.Item label="Least important" value="1" />
                        <Picker.Item label="Less important" value="2" />
                        <Picker.Item label="Most important" value="3" />
                    </Picker>
                    <Text style={[styles.taskImportance, { color: "black" }, { textDecorationLine: 'none' }]}>Importance:<Text>{this.props.importance}</Text></Text>
                    <Text style={[styles.taskCreated, { color: "black" }, { textDecorationLine: 'none' }]}>Created:<Text>{this.props.created}</Text></Text>
                    <View style={styles.iconsContainer}>
                        <View style={styles.icons}>
                            <TouchableOpacity onPress={() => this.finishTask(this.props.id)}>

                                <MaterialIcons name="done" size={27} color="black" />

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.deleteTask(this.props.id)}>
                                <MaterialIcons name="delete" size={27} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }

    }


}

const styles = StyleSheet.create({

    task: {
        borderBottomRightRadius: 30,
        padding: 15,
        margin: 15,
        elevation: 5,

    },
    taskTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    taskImportance: {
        fontWeight: 'bold'
    },
    taskCreated: {
        fontSize: 10,
        fontStyle: 'italic',
        marginTop: 10,

    },
    iconsContainer: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        marginRight: 20

    },
    icons: {
        flexDirection: 'row',


    },
})