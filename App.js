import React, { Component } from 'react';
import './css/App.css';
import Container from './components/container'
import Header from './components/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: JSON.parse(localStorage.getItem("taskList")) || []
    }
  }

  // Add Task
  addTask(event) {
    event.preventDefault();
    let newTaskValue = event.target.elements.TaskName.value;
    if (newTaskValue) {
      let currentTaskList = this.state.taskList;
      currentTaskList.push({ "taskName": newTaskValue, "id": currentTaskList.length + 1, "className": "undone_Task" });
      this.setTaskList(currentTaskList);
      this.setLocalStorage();
      event.target.elements.TaskName.value = "";
    } else {
      alert("Please Add Task..");
    }
  }

  // Delete Task
  deleteTask(index) {
    if (window.confirm("Are you sure you want to delete task?")) {
      this.confirmDelete(index);
    }
  }
  confirmDelete(index) {
    let taskItemsList = this.state.taskList;
    taskItemsList.splice(index, 1);
    this.setTaskList(taskItemsList);
    this.setLocalStorage();
  }

  //Set State
  setTaskList(currentTaskList) {
    this.setState({ "taskList": currentTaskList });
  }

  // Mark Task as Completed
  taskCompleted(event, index) {
    let assignClassName;
    event.target.checked === true ? assignClassName = "done_Task" : assignClassName = "undone_Task";
    let tempTaskList = this.state.taskList;
    tempTaskList[index].className = assignClassName;
    this.setTaskList(tempTaskList);
    this.setLocalStorage();
  }

  // Set task list in local storage
  setLocalStorage() {
    localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
  }

  render() {
    const taskListItems = (this.state.taskList || []).map((item, index) => {
      return (
        <tr key={item.id}>
          <td className="icon-Alignment" ><input type="checkbox" checked={item.className === 'done_Task'} onChange={(event) => this.taskCompleted(event, index)} /></td>
          <td className={item.className} >{item.taskName}</td>
          <td className="icon-Alignment delete-icon" value={item.id} index={index} onClick={() => this.deleteTask(index)}>X</td>
        </tr>
      );
    });
    return (
      <div className="App">
        <Header />
        <Container taskList={taskListItems} addTask={(event) => this.addTask(event)} />
      </div>
    );
  }
}

export default App;
