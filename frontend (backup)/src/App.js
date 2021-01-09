import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      todoList:[],
      activeItem:{
        title:'',
        description:'',
        completed:false,
      },
      editing:false
    }
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);

    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  };

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  componentDidMount(){
    this.fetchTasks();
  }

  fetchTasks(){
    console.log('fetching...')

    fetch('http://127.0.0.1:8000/api/tasks/')
    .then(response => response.json())
    .then(data => 
        this.setState({
          todoList:data
        })
    )
  }

  handleTitle(e){
    var value = e.target.value

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleDescription(e){
    var description = e.target.value

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        description:description
      }
    })
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('ITEM', this.state.activeItem)

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/create/'

    if(this.state.editing === true){
      url = 'http://127.0.0.1:8000/api/update/' + this.state.activeItem.id + '/'
      this.setState({
        editing:false,
      })
    }

    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.activeItem),
    }).then((response) => {
        this.fetchTasks()
        this.setState({
          activeItem:{
            title:'',
            description:'',
        }
      })
    }).catch(function(error){
      console.log('ERROR:', error)
    })
  }

  editTask(task){
    this.setState({
      activeItem:task,
      editing:true,
    })

  }

  deleteTask(task){
    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/delete/' + task.id + '/'
    fetch(url, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
    }).then((response) => {
      this.fetchTasks()
    })
  }

  render(){
    var tasks = this.state.todoList;
    var self = this

    return(
        <div className="container">
          <div id="task-container">

            <div id="form-wrapper">
              <form id="form" onSubmit={this.handleSubmit}>
                <div className="flex-wrapper">
                  <div className="user-input" style={{flex: 6}}>
                    <input onChange={this.handleTitle} className="form-control" value={this.state.activeItem.title} id="title" name="title" type="text" placeholder="Task Title" />
                  </div>
                  <div className="user-input" style={{flex: 6}}>
                    <input onChange={this.handleDescription} className="form-control" value={this.state.activeItem.description} id="description" name="description" type="text" placeholder="Task Description" />
                  </div>
                  <div style={{flex: 1}}>
                    <input className="btn btn-warning" id="submit" type="submit" name="Add" value="Add Task" />
                  </div>
                </div>
              </form>
            </div>

            <div id="list-wrapper">
              {tasks.map(function(task, index){
                return(
                    <div key={index} className="task-wrapper flex-wrapper">
                      <div style={{flex:5}}>
                        <span>{task.title}</span>
                      </div>
                      <div style={{flex:5}}>
                        <span>{task.description}</span>
                      </div>
                      <div style={{flex:1}}>
                        <button onClick={() => self.editTask(task)} className="btn btn-sm btn-outline-info">Edit</button>
                      </div>
                      <div style={{flex:1}}>
                        <button onClick={() => self.deleteTask(task)} className="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </div>
                  )
              })}
            </div>

          </div>
        </div>
      )
  }
}

export default App;
