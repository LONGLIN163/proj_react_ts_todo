import React, { useRef } from 'react'
import "./styles.css"

interface Props {
  todo:string;
  setTodo:React.Dispatch<React.SetStateAction<string>>
  addTodoHandler: (e: React.FormEvent)=>void;
}

//const InputField = ({todo,setTodo}:Props) => {
const InputField: React.FC<Props>=({todo,setTodo,addTodoHandler}) => {
  const inputRef=useRef<HTMLInputElement>(null);
  return (
    <form className='input' 
      // onSubmit={addTodoHandler} // this is ok as well
      onSubmit={(e) => {
          addTodoHandler(e)
          inputRef.current?.blur()// the blur will shift the focus out of the input field
        }
      }
    >
        <input 
          type="input" 
          ref={inputRef}
          value={todo}
          onChange={ (e) => {
              setTodo(e.target.value)
            }
          }
          placeholder='create your next task here...'  
          className='input__box'
        />
        <button className='input_submit' type="submit">go</button>
    </form>
  )
}

export default InputField
