import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList } from 'react-native';




//components
import Hededer from './components/Header.js';
import AddTask from './components/AddTask.js';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      data: [
        { title: 'Go to the office', description: 'Make important phone calls', importance: 1, isFinished: true },
        { title: 'Prepare tasks for today', description: 'Make important phone calls', importance: 2, isFinished: false },
        { title: 'Team meeting', description: 'Make important phone calls', importance: 3, isFinished: false },
        { title: 'Commit tasks changed', description: 'Make important phone calls', importance: 2, isFinished: false },

      ]
    };


  }




  onPresstoggleModal() {
    this.setState({ showMenu: !this.state.showMenu });
  }





  render() {
    const FloatActionButton = () => {
      if (this.state.showMenu) {
        return null;

      } else {
        return (
          <View style={styles.fabContainer}>
            <TouchableOpacity style={styles.fab} onPress={() => this.onPresstoggleModal()} >
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        );
      }

    }

    const Item = ({ title, description, importance }) => {

      return (
        <View style={styles.task}>
          <Text style={styles.taskTitle}>{title}</Text>
          <Text style={styles.taskDescription}>{description}</Text>
          <Text style={styles.taskImportance}>Importance:<Text>{importance}</Text></Text>
          <View style={styles.iconsContainer}>
            <View style={styles.icons}>
            <TouchableOpacity>

              <MaterialIcons name="done" size={25} color="black" />

            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="mode-edit" size={25} color="black" />

            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="delete" size={25} color="black" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );

    }

    return (

      <View style={styles.container}>
        <Hededer />
        <Modal animationType="slide"
          transparent={true}
          visible={this.state.showMenu}
          onRequestClose={() => this.onPresstoggleModal()}>

          <AddTask closeModal={() => this.onPresstoggleModal()} />
        </Modal>

        <Text style={styles.title}>Tasks</Text>
        <View style={styles.bar} />

        <FlatList

          data={this.state.data}
          renderItem={({ item }) => <Item style={styles.item} title={item.title} description={item.description} importance={item.importance} />}
        />
        <FloatActionButton />


      </View>
    );
  }

}




const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
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
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 25,

  },
  bar: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    height: 0.5

  },
  tasksList: {

  },
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
    

  },
  icons:{
    flexDirection:'row',
    
    
  }








});





