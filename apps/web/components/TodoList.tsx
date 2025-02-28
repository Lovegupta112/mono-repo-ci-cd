"use client"
import { useEffect, useState } from 'react';
import { ITodo } from '../types/userType';

const TodoList =  ({userId,todosData}:{userId:string,todosData:ITodo[]}) => {

  const [todoInfo,setTodoInfo]=useState({todoName:'',status:'Pending'});
  const [ws,setWs]=useState<WebSocket>();
  const [todos,setTodos]=useState(todosData);



    useEffect(()=>{
      const websocket=new WebSocket('ws://localhost:8081');
      setWs(websocket);

      websocket.onmessage=async (event)=>{
       const data=event.data ;
       const res=await fetch(`http://localhost:8080/todos/${userId}`);
       const todosData=await res.json();
       setTodos(todosData.allTodos);
      }

      return ()=>{
       websocket.close();
      }
    },[])
    

    const handleSubmit=()=>{
        ws?.send(JSON.stringify({todoInfo,userId}));
    }
   
  return (
    <div>
      <div>
      <input type="text" placeholder="enter your name" value={todoInfo.todoName} onChange={(e)=>setTodoInfo({...todoInfo,todoName:e.target.value})} />
      <button onClick={handleSubmit}>Create Todo</button>
      </div>
       {todos?.map((todo)=>(<div key={todo.id} style={{border:'1px solid blue'}}>
            <p>{todo.todoName}</p>
            <p>{todo.status}</p>
        </div>))}
    </div>
  )
}

export default TodoList;