import {WebSocketServer} from 'ws';
import {prismaClient} from '@repo/db/client';


const wss=new WebSocketServer({port:8081});



wss.on('connection',(ws)=>{
    
    ws.on('message',async (message)=>{
        const data=JSON.parse(message as unknown as string);
        console.log('data..',data);
  
        const userId=data.userId;
        const todoInfo=data.todoInfo;

       try{
         const res=await prismaClient.todo.create({
            data:{
                ...todoInfo,
                userId
            }
         })
        ws.send(JSON.stringify(res));
       }
       catch(err){
        ws.close();
       }

       ws.on('close',()=>{
        ws.close();
       })
    })

    ws.send(`ws is connected .. ${8081}`)
})