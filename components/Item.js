import React, { Component } from "react";
import {StyleSheet,View,Text,TextInput,Picker,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default class Item extends Component {
    render() {
        return (
            <View style={styles.task}>
                <TextInput  style={styles.taskTitle} value={this.props.title} onChangeText={value => this.props.onTitleChange(value, this.props.id)} />
                <TextInput style={styles.taskDescription} value={this.props.description} onChangeText={value => this.props.onDescriptionChange(value,this.props.id)} />
                <Picker
                    defaultValue='test'
                    selectedValue={this.props.importance}
                    style={{ height: 50, width: 220 }}
                    onValueChange={value => this.props.onImportanceChange(value,this.props.id)}>
                    <Picker.Item label="Level of importance" value="0" color="grey" />
                    <Picker.Item label="Least important" value="1" />
                    <Picker.Item label="Less important" value="2" />
                    <Picker.Item label="Most important" value="3" />
                </Picker>
                <Text style={styles.taskImportance}>Importance:<Text>{this.props.importance}</Text></Text>
                <View style={styles.iconsContainer}>
                    <View style={styles.icons}>
                        <TouchableOpacity>

                            <MaterialIcons name="done" size={27} color="black" />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.deleteTask(this.props.id)}>
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
        backgroundColor: 'coral',
        padding: 15,
        margin: 15
    
    
      },
      taskTitle: {
        fontSize: 25,
        fontWeight: 'bold'
      },
      taskDescription: {
    
      },
      taskImportance: {
        fontWeight: 'bold'
      },
      iconsContainer: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        marginRight: 20
    
      },
      icons: {
        flexDirection: 'row',
    
    
      }
})