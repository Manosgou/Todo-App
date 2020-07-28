import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, Modal, FlatList, SafeAreaView } from 'react-native';

import data from './data.js'

import AsyncStorage from '@react-native-community/async-storage';

//components
import Hededer from './components/Header.js';
import AddTask from './components/AddTask.js';
import FloatActionButton from './components/FloatActionButton.js';
import Item from './components/Item.js';
import DeleteTasks from './components/DeleteTasks.js'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      addTaskModal: false,
      deleteTasks: false,
      tasks: [],
    };

  }

  getFonts = () => Font.loadAsync({
    'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
    'Oxygen': require('./assets/fonts/Oxygen-Bold.ttf'),
  });

  getKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch (e) {
      console.log("error:Keys cannot be retrieved")
    }
    return keys;

  }


  async componentDidMount() {
    //await AsyncStorage.clear()
    let keys = await this.getKeys()

    let item, newItem;
    for (let i in keys) {
      try {

        item = await AsyncStorage.getItem(keys[i])
        newItem = JSON.parse(item)
        console.log(newItem)
        this.setState({ tasks: [...this.state.tasks, newItem] })


      } catch (e) {
        console.log("error:Tasks cannot be retrieved")
      }


    }

  }


  onPresstoggleAddTaskModal() {
    this.setState({ addTaskModal: !this.state.addTaskModal });
  }

  onPresstoggleDeleteTasks() {
    this.setState({ deleteTasks: !this.state.deleteTasks });
  }


  addTask = async task => {
    let id = Math.random().toString();
    this.setState({
      tasks: [{
        ...task,
        id: id,
        isFinished: false,
        created: moment().format('ll')
      }, ...this.state.tasks]

    });
    let taskObj = {
      ...task,
      id: id,
      isFinished: false,
      created: moment().format('ll')
    }
    console.log(taskObj)
    try {
      await AsyncStorage.setItem("@" + taskObj.id, JSON.stringify(taskObj))
    } catch (e) {
      console.log("error:Task cannot be saved")
    }
  };



  deleteTask = async taskId => {
    const task = this.state.tasks.filter(task => task.id != taskId);
    this.setState({ tasks: task })
    try {
      await AsyncStorage.removeItem('@' + taskId)
    } catch (e) {
      console.log("error:Task cannot be deleted")
    }
  };

  finishTask = async (taskId, isFinished) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === taskId);
    tasks[index].isFinished = !isFinished
    this.setState({ tasks });
    try {
      await AsyncStorage.mergeItem('@' + taskId, JSON.stringify(tasks[index]))
    } catch (e) {
      console.log("error:Task's title cannot be updated")
    }
  }

  taskIsFinished = taskId => {

    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === taskId);
    if (tasks[index].isFinished) {
      return true;
    }



  }

  onTitleChange = async (inputValue, id) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === id);
    tasks[index].title = inputValue
    this.setState({ tasks })
    try {
      await AsyncStorage.mergeItem('@' + id, JSON.stringify(tasks[index]))
    } catch (e) {
      console.log("error:Task's title cannot be updated")
    }
  }

  onDescriptionChange = async (inputValue, id) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === id);
    tasks[index].description = inputValue
    this.setState({ tasks })
    try {
      await AsyncStorage.mergeItem('@' + id, JSON.stringify(tasks[index]))
    } catch (e) {
      console.log("error:Task's description cannot be updated")
    }
  }

  onImportanceChange = async (inputValue, id) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === id);
    if (inputValue != 0) {
      tasks[index].importance = inputValue
    }

    this.setState({ tasks })
    try {
      await AsyncStorage.mergeItem('@' + id, JSON.stringify(tasks[index]))
    } catch (e) {
      console.log("error:Task's importance cannot be updated")
    }
  }

  async deleteTasks() {
    this.setState({ tasks: [] })

    let keys = await this.getKeys()

    for (let i in keys) {
      try {

        await AsyncStorage.removeItem(keys[i])


      } catch (e) {
        console.log("error:Tasks cannot be retrieved")
      }
    }
    this.onPresstoggleDeleteTasks()
  }
  render() {
    if (this.state.fontsLoaded) {

      return (

        <SafeAreaView style={{ flex: 1 }}>
          <Hededer deleteTasks={() => this.onPresstoggleDeleteTasks()} />
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.deleteTasks}
            onRequestClose={() => this.onPresstoggleDeleteTasks()}
          >
            <DeleteTasks deleteTasks={() => this.deleteTasks()} closeModal={() => this.onPresstoggleDeleteTasks()} />

          </Modal>
          <Modal animationType="slide"
            transparent={true}
            visible={this.state.addTaskModal}
            onRequestClose={() => this.onPresstoggleAddTaskModal()}>

            <AddTask closeModal={() => this.onPresstoggleAddTaskModal()} addTask={this.addTask} />
          </Modal>
          <Text style={styles.title}>Tasks</Text>
          <View style={styles.bar} />
          <View style={styles.info}>
            <View style={styles.infoContainer}>
              <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 15, fontFamily: 'Oxygen' }}>Total Tasks</Text>
              <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 30, fontFamily: 'Oxygen', color: 'white' }}>{this.state.tasks.length}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 15, fontFamily: 'Oxygen' }}>Remain</Text>
              <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 30, fontFamily: 'Oxygen', color: 'white' }}>{this.state.tasks.length - this.state.tasks.filter(function (s) { return s.isFinished; }).length}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 15, fontFamily: 'Oxygen' }}>Completed</Text>
              <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 30, fontFamily: 'Oxygen', color: 'white' }}>{this.state.tasks.filter(function (s) { return s.isFinished; }).length}</Text>
            </View>
          </View>
          <View style={styles.bar} />
          {this.state.tasks.length == 0 ?
            <View style={{ flex: 1, justifyContent: 'center', opacity: 0.2 }}>
              <AntDesign style={{ textAlign: 'center' }} name="inbox" size={65} color="black" />
              <Text style={{ textAlign: 'center' }}>No tasks for today!</Text>
            </View> :
            <FlatList
              keyboardShouldPersistTabs='handled'
              data={this.state.tasks}
              renderItem={({ item }) => <Item id={item.id} created={item.created} onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onImportanceChange={this.onImportanceChange} deleteTask={this.deleteTask} finishTask={this.finishTask} taskIsFinished={this.taskIsFinished} title={item.title} description={item.description} importance={item.importance} />}
              keyExtractor={item => item.id}
              onDragEnd={({ tasks }) => this.setState({ tasks })}
            />}

          <FloatActionButton buttonState={this.state.addTaskModal} onFABPress={() => this.onPresstoggleAddTaskModal()} />
        </SafeAreaView>



      );
    } else {
      return (
        <AppLoading
          startAsync={this.getFonts}
          onFinish={() => { this.setState({ fontsLoaded: true }) }} />)
    }
  }
}






const styles = StyleSheet.create({
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
  info: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,

  },
  infoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#D95525',
    borderRadius: 25,
    elevation: 2

  }

});





