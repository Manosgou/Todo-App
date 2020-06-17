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
    render() {

        return (
            <View style={[styles.task, { backgroundColor: this.state.isFinished === false ? "coral" : "grey" }]}>


                <TextInput style={[styles.taskTitle, { color: this.state.isFinished === false ? "black" : "white" }, { textDecorationLine: this.state.isFinished === false ? 'none' : "line-through" }]} value={this.props.title} onChangeText={value => this.props.onTitleChange(value, this.props.id)} />
                <TextInput style={{color: this.state.isFinished === false ? "black" : "white" }, { textDecorationLine: this.state.isFinished === false ? 'none' : "line-through" }} value={this.props.description} onChangeText={value => this.props.onDescriptionChange(value, this.props.id)} />
                <Picker
                    selectedValue={this.props.importance}
                    style={{ height: 50, width: 220 }}
                    onValueChange={value => this.props.onImportanceChange(value, this.props.id)}>
                    <Picker.Item label="Level of importance" value="0" color="grey" />
                    <Picker.Item label="Least important" value="1" />
                    <Picker.Item label="Less important" value="2" />
                    <Picker.Item label="Most important" value="3" />
                </Picker>
                <Text style={[styles.taskImportance, { color: this.state.isFinished === false ? "black" : "white" }, { textDecorationLine: this.state.isFinished === false ? 'none' : "line-through" }]}>Importance:<Text>{this.props.importance}</Text></Text>
                <Text style={[styles.taskCreated, { color: this.state.isFinished === false ? "black" : "white" }, { textDecorationLine: this.state.isFinished === false ? 'none' : "line-through" }]}>Created:<Text>{this.props.created}</Text></Text>
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