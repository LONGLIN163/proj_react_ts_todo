import React from 'react'
import "./styles.css"
import {Todo} from "../model"
import TodoItem from './TodoItem';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos:Todo[];
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoList = ({todos,setTodos,completedTodos,setCompletedTodos}:Props) => {
  return (
    <div className="container">

      <Droppable droppableId='todosList'>
        {
          (provided,snapshot)=>(
            <div 
              className={`todos ${snapshot.isDraggingOver?"draggactive":""}`} 
              ref={provided.innerRef} //DND will consider this div is the drappable zone
              {...provided.droppableProps}
            >
              <span className="todos__heading">
                Active Tasks
              </span>
              {
                todos.map( (todo,index) => (
                    <TodoItem 
                        index={index}
                        todo={todo} 
                        key={todo.id}
                        todos={todos}
                        setTodos={setTodos}
                    />
                  )
                )
              }
              {/* provide a place to drop at the place where is drappable */}
              {provided.placeholder} 
            </div>
          )
        }
        
      </Droppable>

      <Droppable droppableId='todosCompleted'>

        {
          (provided,snapshot)=>(
            <div 
              className={`todos remove ${snapshot.isDraggingOver?"draggcomplete":""}`} 
              ref={provided.innerRef} //DND will consider this div is the drappable zone
              {...provided.droppableProps}
            >
              <span className="todos__heading">
                Completed Tasks
              </span>
              {
                completedTodos.map((todo,index) => (
                    <TodoItem 
                        index={index}
                        todo={todo} 
                        key={todo.id}
                        todos={completedTodos }
                        setTodos={setCompletedTodos}
                    />
                  )
                )
              } 
              {provided.placeholder}
            </div>
        )
      }
              
      </Droppable>

    </div>
  )
}

export default TodoList
