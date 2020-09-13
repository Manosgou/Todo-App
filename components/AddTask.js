import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  Switch,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
export default class AddData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      titleError: "",
      description: "",
      descriptionError: "",
      importance: "",
      importanceError: "",
      date: "",
      remindDate: "",
      isDatePickerVisible: false,
    };
  }

  handleInputChange = (inputName, inputValue) => {
    if (inputValue != "0") {
      this.setState((state) => ({
        ...state,
        [inputName]: inputValue,
      }));
    }
  };

  handleValidation = () => {
    const { title, description, importance } = this.state;
    let taskIsValid = true;
    if (!title.trim()) {
      taskIsValid = false;
      this.setState({ titleError: "Please enter a task title" });
    }
    if (!description.trim()) {
      taskIsValid = false;
      this.setState({ descriptionError: "Please enter a task description" });
    }

    if (!importance.trim()) {
      taskIsValid = false;
      this.setState({ importanceError: "Please select task's importance" });
    }

    return taskIsValid;
  };
  createTask = () => {
    if (this.handleValidation()) {
      const { title, description, importance,remindDate } = this.state;
      const task = { title, description, importance,remindDate };
      this.props.addTask(task);
      this.props.closeModal();
    }
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
  };

  selectDate = (date) => {
    var dateString =
      date.getUTCDate() +
      "/" +
      (date.getUTCMonth() + 1) +
      "/" +
      date.getUTCFullYear()
    this.setState({ remindDate: dateString });
    this.showDatePicker();
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={this.props.closeModal}
          >
            <AntDesign name="closecircle" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.menuHeader}>Add Task</Text>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 17 }}>
            Title
          </Text>
          <TextInput
            placeholder="e.x Go to the market"
            style={styles.textInput}
            onChangeText={(value) => this.handleInputChange("title", value)}
          />
          <Text style={{ color: "red" }}>{this.state.titleError}</Text>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 17 }}>
            Description
          </Text>
          <TextInput
            placeholder="e.x Grab some milk"
            style={styles.textInput}
            onChangeText={(value) =>
              this.handleInputChange("description", value)
            }
          />
          <Text style={{ color: "red" }}>{this.state.descriptionError}</Text>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 17 }}>
            Importance
          </Text>
          <Picker
            selectedValue={this.state.importance || ""}
            style={{ height: 50, width: 220 }}
            onValueChange={(value) =>
              this.handleInputChange("importance", value)
            }
          >
            <Picker.Item label="Level of importance" value="0" color="grey" />
            <Picker.Item
              label="Least important"
              value="#46A346/LOW"
              color="#46A346"
            />
            <Picker.Item
              label="Less important"
              value="#FFB62F/MEDIUM"
              color="#FFB62F"
            />
            <Picker.Item
              label="Most important"
              value="#FF3232/HIGH"
              color="#FF3232"
            />
          </Picker>

          <Text style={{ color: "red" }}>{this.state.importanceError}</Text>
          {this.state.importance == "" ? null : (
            <View
              style={{
                marginTop: 2,
                marginLeft: 4,
                width: 70,
                height: 20,
                borderRadius: 7,
                backgroundColor: this.state.importance.split("/")[0],
                elevation: 2,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "700",
                  fontFamily: "Poppins-Medium",
                }}
              >
                {this.state.importance.split("/")[1]}
              </Text>
            </View>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text>Remind me:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "coral" }}
              thumbColor={this.state.isDatePickerVisible ? "coral" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.showDatePicker}
              value={this.state.isDatePickerVisible}
            />
          </View>
          <DateTimePickerModal
            mode="date"
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.selectDate}
            onCancel={this.showDatePicker}
          />
          <Text>{this.state.remindDate.toString()}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                this.createTask();
              }}
            >
              <Text style={styles.buttonsText}>Add</Text>
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 30,
    backgroundColor: "white",
    width: "95%",
    height: "95%",
    elevation: 3,
    flexBasis: "85%",
  },
  textInput: {
    borderBottomWidth: 0.3,
    borderColor: "coral",
    width: "80%",
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    backgroundColor: "#D95525",
    borderRadius: 50,
    elevation: 2,
  },
  buttonsText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  menuHeader: {
    fontWeight: "bold",
    fontSize: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
