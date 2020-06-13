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
      tasks: [
        {
          id: '1',
          title: 'Go to the office',
          description: 'Make important phone calls',
          importance: 1,
        },
        {
          id: '2',
          title: 'Prepare tasks for today',
          description: 'Make important phone calls',
          importance: 2,
        },
        {
          id: '3',
          title: 'Team meeting',
          description: 'Make important phone calls',
          importance: 3,
        },
        {
          id: '4',
          title: 'Commit tasks changed',
          description: 'Make important phone calls',
          importance: 2,
        },
      ]
    };


  }



  onPresstoggleModal() {
    this.setState({ showMenu: !this.state.showMenu });
  }




  addTask = task => {
    this.setState({
      tasks: [...this.state.tasks, {
        ...task,
        id: this.state.tasks.length + 1,
      }]

    });
    console.log(this.state.tasks)
  };



  deleteTask = taskId => {
    const task = this.state.tasks.filter(task => task.id != taskId);
    this.setState({ tasks: task })
    console.log(this.state.tasks)


  };



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

    const Item = ({ id, title, description, importance, deleteTask }) => {

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
              <TouchableOpacity  >
                <MaterialIcons name="mode-edit" size={25} color="black" />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(id)}>
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

          <AddTask closeModal={() => this.onPresstoggleModal()} addTask={this.addTask} />
        </Modal>

        <Text style={styles.title}>Tasks</Text>
        <View style={styles.bar} />

        <FlatList
          renderItem={this.Item}
          data={this.state.tasks}
          renderItem={({ item }) => <Item style={styles.item} id={item.id} deleteTask={this.deleteTask} title={item.title} description={item.description} importance={item.importance} />}
          keyExtractor={item => item.id}
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
    marginRight: 20

  },
  icons: {
    flexDirection: 'row',


  }








});





