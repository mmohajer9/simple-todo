/* eslint-disable no-unused-vars */
import React , { Component } from 'react';
import {Row , Col , ButtonGroup , Button , Alert , InputGroup , FormControl} from 'react-bootstrap';
import './Page.css'


class Header extends Component
{
  state = {
    form_input : ''
  }
  
  add_element = ()  => (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text
        onClick = {this.props.AddToTodo.bind(this.props.Display_obj , this.state.form_input)}
        className = "add-todo-btn" style = { {cursor : "pointer"} } id="inputGroup-sizing-default">
          اضافه کردن  
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        onChange = {(event) => {
          console.log(event.target.value)
          this.setState({ form_input : event.target.value})
        }}
        aria-label="اضافه کردن"
        aria-describedby="inputGroup-sizing-default"
      />          
    </InputGroup>
  )
  render() {
    return (
      <div className = "header d-flex flex-column">
        <ButtonGroup className = "header-btn-group" size="lg">
          <Button className = "header-btn" variant = "dark" onClick = {this.props.ChangeToTodo}>لیست کار ها</Button>
          <Button className = "header-btn" variant = "success" onClick = {this.props.ChangeToComp}>انجام شده ها</Button>
        </ButtonGroup>
      
        {
          this.props.isTodo
          ? this.add_element()
          : null
        }
      </div>
    )
  }

}

function ListItem(props) {

  if(props.type === 'todo')
  {
    return (

      <div className = "todoListItem" onClick = {props.AddToComp}>
        <Alert variant = "info">
        <Alert.Heading>{props.item.title}</Alert.Heading>
        <p style={{fontSize : ".5em" , }}>{props.item.date}</p>
        </Alert>
      </div>
  
    )
  }
  else
  {
    return (

      <div className = "compListItem" onClick = {props.AddToTodo}>
        <Alert variant = "success">
        <Alert.Heading>{props.item.title}</Alert.Heading>
        <p style={{fontSize : ".5em"}}>{props.item.date}</p>
        </Alert>  
      </div>
  
    )
  }


}


class Display extends Component
{
  constructor(props){
    super(props);
    this.state = ({
      isTodo : true,
      isComp : false,
      todo : [
        {
          title : 'کار اول',
          date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
        },
        {
          title : 'کار دوم',
          date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
        },
        {
          title : 'کار سوم',
          date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
        },
      ],
      comp : [
        {
          title : 'کار چهارم',
          date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
        },
        {
          title : 'کار پنجم',
          date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
        },
        {
          title : 'کار ششم',
          date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
        },
        {
          title : 'کار هفتم',
          date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
        },
      ]
    });
  }

  ChangeToComp = () => {
    this.setState({isTodo : false , isComp : true});
  }
  ChangeToTodo = () => {
    this.setState({isTodo : true , isComp : false});
  }

  AddToTodo = (text) => {
    this.setState((prev , props) => {
      let todo_item = {
        title : text,
        date : (new Date()).toLocaleDateString().concat(` - ${new Date().toLocaleTimeString()}`),
      }
      let new_todo = [...prev.todo , todo_item];
      return { todo : new_todo}
    })
  }

  AddToComp = (index) => {

    this.setState((prev , props) => {
      let comp_item = {
        title : prev.todo[index].title,
        date : prev.todo[index].date
      }
      let new_comp = [...prev.comp , comp_item];
      let temp_todo = prev.todo.map(item => item)
      temp_todo.splice(index , 1);
      console.log(this.state.todo);
      return {
        todo : temp_todo,
        comp : new_comp
      }
    })
  }

  render() {
    // console.log(this.state);
    return (
      <div className = "display">
        <Header isTodo={this.state.isTodo} ChangeToTodo = {this.ChangeToTodo} ChangeToComp = {this.ChangeToComp} Display_obj = {this}  AddToTodo = {this.AddToTodo}/>
        {
          this.state.isTodo 
          ? this.state.todo.map((item , index) => <ListItem AddToComp = {this.AddToComp.bind(this , index)} key = {index} type = "todo" item = {item}/>) 
          : this.state.comp.map((item , index) => <ListItem key = {index} type = "comp" item = {item}/>)   
        }
      </div>
    )
  }

}

class Page extends Component
{

  render() {
    return (
      <div className = "Page">
        <Display />
      </div>
    )
  }

}

export default Page;