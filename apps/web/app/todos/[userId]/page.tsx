import { prismaClient } from "@repo/db/client";
import TodoList from "../../../components/TodoList";
import { ITodo } from "../../../types/userType";


const Todos =  async ({params}:any) => {

    const userId=await (params).userId;
    console.log('userId: ',userId);
 
        const todosData:ITodo[]=await prismaClient.todo.findMany({
            where:{userId}
        })
        console.log('todos...',todosData);
  
  return (
    <div>
     <TodoList userId={userId} todosData={todosData} />
    </div>
  )
}

export default Todos;