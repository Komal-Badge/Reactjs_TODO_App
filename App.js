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
      this.state.taskList.push({ "taskName": newTaskValue, "id": this.state.taskList.length + 1, "className": "undone_Task" });
      this.setLocalStorage();
      event.target.elements.TaskName.value = "";
    } else {
      alert("Please Add Task..");
    }
  }

  // Delete Task
  deleteTask(index) {
    if (window.confirm("Are you sure you want to delete task?")) {
      this.confirm_delete(index);
    }
  }
  confirm_delete(index) {
    this.state.taskList.splice(index, 1);
    this.setLocalStorage();
  }

  // Mark Task as Completed
  taskCompleted(event, index) {
    let assignClassName;
    event.target.checked === true ? assignClassName = "done_Task" : assignClassName = "undone_Task";
    this.state.taskList[index].className = assignClassName;
    this.setLocalStorage();
  }

  // Set task list in local storage
  setLocalStorage() {
    this.setState({ "taskList": this.state.taskList });
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
