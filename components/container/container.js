import React, { Component } from 'react';
import '../../css/App.css';
class Container extends Component {
  render() {
    const { taskList, addTask } = this.props;
    return (
      <div className="App">
        <div className="AddTaskForm">
          <form onSubmit={(event) => addTask(event)}>
            <div className="row">
              <div className="col-10"></div>
              <div className="col-70">
                <input type="text" className="Input-Box" id="addTaskName" name="TaskName" placeholder="Add your Task.." />
              </div>
              <div className="col-20">
                <input type="submit" className="AddTask Input-Box" placeholder="Add Task" />
              </div>
              <div className="col-10"></div>
            </div>
          </form>
        </div>
        <div className="toDoList-Outer">
          <h3>My Task List</h3>
          <div className="toDoList">
            <table id="taskList">
              <tbody>
                <tr >
                  <th></th>
                  <th>Task</th>
                  <th></th>
                </tr>
                {taskList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Container;
