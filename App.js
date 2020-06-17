import React, { Component } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, Modal, FlatList } from 'react-native';



//components
import Hededer from './components/Header.js';
import AddTask from './components/AddTask.js';
import FloatActionButton from './components/FloatActionButton.js';
import Item from './components/Item.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      addTaskModal: false,
      tasks: [
        {
          id: '1',
          title: 'Go to the office',
          description: 'Make important phone calls',
          importance: 1,
          isFinished: false,
          created: '01/02/2018'
        },
        {
          id: '2',
          title: 'Prepare tasks for today',
          description: 'Make important phone calls',
          importance: 2,
          isFinished: false,
          created: '12/05/2012'
        },
        {
          id: '3',
          title: 'Team meeting',
          description: 'Make important phone calls',
          importance: 3,
          isFinished: false,
          created: '03/12/1991'
        },
        {
          id: '4',
          title: 'Commit tasks changed',
          description: 'Make important phone calls',
          importance: 2,
          isFinished: false,
          created: '27/05/2008'
        },
      ]
    };

  }

  getFonts = () => Font.loadAsync({
    'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
    'Oxygen': require('./assets/fonts/Oxygen-Bold.ttf'),
  });




  onPresstoggleAddTaskModal() {
    this.setState({ addTaskModal: !this.state.addTaskModal });
  }



  addTask = task => {
    let date = new Date()
    this.setState({
      tasks: [...this.state.tasks, {
        ...task,
        id: (this.state.tasks.length + 1).toString(),
        isFinished: false,
        created: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      }]

    });
    console.log(this.state.tasks)
  };



  deleteTask = taskId => {
    const task = this.state.tasks.filter(task => task.id != taskId);
    this.setState({ tasks: task })
    console.log(this.state.tasks)


  };

  finishTask = (taskId, isFinished) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === taskId);
    tasks[index].isFinished = !isFinished
    this.setState({ tasks });
    console.log(this.state.tasks)
  }

  onTitleChange = (inputValue, id) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === id);
    tasks[index].title = inputValue
    this.setState({ tasks })
  }

  onDescriptionChange = (inputValue, id) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === id);
    tasks[index].description = inputValue
    this.setState({ tasks })
  }

  onImportanceChange = (inputValue, id) => {
    let tasks = [...this.state.tasks];
    let index = tasks.findIndex(el => el.id === id);
    if (inputValue != 0) {
      tasks[index].importance = inputValue
    }

    this.setState({ tasks })
  }

  render() {
    if (this.state.fontsLoaded) {

      return (

        <View style={{ flex: 1 }}>
          <Hededer />
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
              <Text style={{ textAlign: 'center', marginTop: 15,  fontSize: 15,fontFamily:'Oxygen' }}>Total Tasks</Text>
              <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 30,fontFamily:'Oxygen' }}>{this.state.tasks.length}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={{ textAlign: 'center', marginTop: 15,fontSize: 15,fontFamily:'Oxygen' }}>Remain</Text>
              <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 30,fontFamily:'Oxygen'}}>{this.state.tasks.length - this.state.tasks.filter(function (s) { return s.isFinished; }).length}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={{ textAlign: 'center', marginTop: 15,fontSize: 15,fontFamily:'Oxygen' }}>Completed</Text>
              <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 30,fontFamily:'Oxygen'}}>{this.state.tasks.filter(function (s) { return s.isFinished; }).length}</Text>
            </View>
          </View>
          <View style={styles.bar} />
          <FlatList
            data={this.state.tasks}
            renderItem={({ item }) => <Item id={item.id} created={item.created} moveUP={this.moveUP} onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onImportanceChange={this.onImportanceChange} deleteTask={this.deleteTask} finishTask={this.finishTask} title={item.title} description={item.description} importance={item.importance} />}
            keyExtractor={item => item.id}
            onDragEnd={({ tasks }) => this.setState({ tasks })}
          />


          <FloatActionButton buttonState={this.state.addTaskModal} onFABPress={() => this.onPresstoggleAddTaskModal()} />


        </View>



      );
    } else {
      return (
        <AppLoading
          startAsync={this.getFonts}
          onFinish={() => {this.setState({fontsLoaded:true})}} />)
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
    backgroundColor: 'coral',
    borderRadius: 25,
    elevation: 2

  }

});





