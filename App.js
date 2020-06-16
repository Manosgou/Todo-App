import React, { Component } from 'react';
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
      addTaskModal: false,
      tasks: [
        {
          id: '1',
          title: 'Go to the office',
          description: 'Make important phone calls',
          importance: 1,
          isFinished:false,
          created:'01/02/2018'
        },
        {
          id: '2',
          title: 'Prepare tasks for today',
          description: 'Make important phone calls',
          importance: 2,
          isFinished:false,
          created:'12/05/2012'
        },
        {
          id: '3',
          title: 'Team meeting',
          description: 'Make important phone calls',
          importance: 3,
          isFinished:false,
          created:'03/12/1991'
        },
        {
          id: '4',
          title: 'Commit tasks changed',
          description: 'Make important phone calls',
          importance: 2,
          isFinished:false,
          created:'27/05/2008'
        },
      ]
    };

  }



  onPresstoggleAddTaskModal() {
    this.setState({ addTaskModal: !this.state.addTaskModal });
  }



  addTask = task => {
    let date =  new Date()
    this.setState({
      tasks: [...this.state.tasks, {
        ...task,
        id: (this.state.tasks.length + 1).toString(),
        isFinished:false,
        created:date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
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
    tasks[index].isFinished=!isFinished
    this.setState({ tasks});
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


    return (

      <View style={styles.container}>
        <Hededer />
        <Modal animationType="slide"
          transparent={true}
          visible={this.state.addTaskModal}
          onRequestClose={() => this.onPresstoggleAddTaskModal()}>

          <AddTask closeModal={() => this.onPresstoggleAddTaskModal()} addTask={this.addTask} />
        </Modal>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.bar} />

        <FlatList
          data={this.state.tasks}
          renderItem={({ item }) => <Item id={item.id} created={item.created} onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onImportanceChange={this.onImportanceChange} deleteTask={this.deleteTask} finishTask={this.finishTask} title={item.title} description={item.description} importance={item.importance} />}
          keyExtractor={item => item.id}
        />


        <FloatActionButton buttonState={this.state.addTaskModal} onFABPress={() => this.onPresstoggleAddTaskModal()} />


      </View>



    );
  }

}




const styles = StyleSheet.create({
  container: {
    flex: 1,

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

});





