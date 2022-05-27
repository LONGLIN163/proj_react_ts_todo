import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import {Todo} from "./model"
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App:React.FC=()=> {
  const [todo,setTodo]=useState<string>("")
  const [todos,setTodos]=useState<Todo[]>([])
  const [completedTodos,setCompletedTodos]=useState<Todo[]>([])


  const addTodoHandler = (e: React.FormEvent) => {
    e.preventDefault(); // stop refreshing the page
    if(todo){
      setTodos([
        ...todos,
        {
         id:Date.now(),
         todo:todo,
         isDone:false
        }
      ]);
      setTodo("") //clear input field
    }
  }

  const onDragEnd=(result:DropResult)=>{
      console.log("onDragEnd result******",result)
      const {source,destination}=result;
      if(!destination) return;
      if(
        destination.droppableId===source.droppableId && 
        destination.index===source.index) 
      return;

      let draggedTodo,
          tempTodos=todos,// store the todos after rm draggedTodo
          tempCompleteTodos=completedTodos;

      //remove draggedTodo from the origin position
      if(source.droppableId==="todosList"){
        draggedTodo=tempTodos[source.index];
        tempTodos.splice(source.index, 1) // rm draggedTodo
      }else{
        draggedTodo=tempCompleteTodos[source.index];
        tempCompleteTodos.splice(source.index, 1) // rm draggedTodo
      }

      //insert draggedTodo to the position of the destination
      if(destination.droppableId==="todosList"){
        draggedTodo.isDone=true
        tempTodos.splice(destination.index, 0, draggedTodo)
      }else{
        draggedTodo.isDone=false
        tempCompleteTodos.splice(destination.index, 0, draggedTodo)
      }

      // reset todos and completeTodos
      setCompletedTodos(tempCompleteTodos)
      setTodos(tempTodos)

      console.log("todos******",todos)
      console.log("completedTodos******",completedTodos)

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

        <div className="App">
          <span className='heading'>todo</span>
          <InputField 
            todo={todo} 
            setTodo={setTodo}
            addTodoHandler={addTodoHandler}
          />

          <TodoList 
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </div>
    </DragDropContext>
  );
}

export default App;
