import React, { useEffect, useRef, useState } from 'react'
import {Todo} from "../model"
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import { MdDone} from "react-icons/md"
import "./styles.css"
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    index:number;
    todo:Todo;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoItem = ({index,todo,todos,setTodos}:Props) => {

  const [edit,setEdit]=useState<boolean>(false)
  const [editTodo,setEditTodo]=useState<string>(todo.todo)

  const handleDone = (id:number) => {
    setTodos(todos.map( (todo) => (
        todo.id===id 
        ? 
        {
          ...todo,
          isDone:!todo.isDone
        } 
        : todo
      )
    ))
  }
  
  const handleDelete = (id:number) => {
    setTodos(todos.filter( (todo) => (
      todo.id!==id 
      )
      ))
    }
    
  const handleEdit = (e:React.FormEvent, id:number) => {
    e.preventDefault();
    setTodos(todos.map( (todo) => ( 
        todo.id===id 
        ? 
        {
          ...todo,
          todo:editTodo
        } 
        : todo
      )
    ))
    setEdit(false);
  }

  const inputRef=useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit]); // fire focus when edit changed 

  return (

    <Draggable 
      draggableId={todo.id.toString()} 
      index={index}
    >
      {
        (provided,snapshot)=>(
          <form 
             className={`todos__single ${snapshot.isDragging?"isDragging":""}`}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef}
             onSubmit={ (e) => { // this form will be triggered when press enter
               //console.log("triggered")
               handleEdit(e,todo.id)
             }
          }>
            {
              edit?(
                <input 
                  type="text" 
                  ref={inputRef}
                  value={editTodo} 
                  onChange={ (e) => setEditTodo(e.target.value)}
                  className="todos__single--text"
                />
              ):(
                todo.isDone?
                (
                
                  <s className='todos__single--text'>
                    {
                      todo.todo
                    }
                  </s>
                
                ):(
                
                  <span className='todos__single--text'>
                    {
                      todo.todo
                    }
                  </span>
                )
              )
            }

            <div>
              <span className="icon" onClick={ () => {
                  if(!edit && !todo.isDone){
                    setEdit(!edit)
                  }
                }
              }>
                <AiFillEdit />
              </span>
              <span className="icon">
                <AiFillDelete onClick={ () => handleDelete(todo.id)} />
              </span>
              <span className="icon">
                <MdDone onClick={ () => handleDone(todo.id)}/>
              </span>
            </div>
            
          </form>
        )
      }


    </Draggable>

  )
}

export default TodoItem

