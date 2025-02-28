import express from "express";
import { prismaClient } from "@repo/db/client";
import cors from 'cors';

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

app.post("/user", async (req, res) => {
  try {
    const {name,password}=req.body;

    console.log('req.body: ',req.body);

    if(!name || !password){
        res.status(400).send('invalid input!');
        return;
    }

   const data= await prismaClient.user.create({
        data:{
            username:name,
            password
        }
    })

    res.status(201).json({message:'user created',userId:data.id});
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/users", (req, res) => {
  prismaClient.user.findMany()
    .then(users => {
      res.json({users});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})


app.get('/todos/:userId',async (req,res)=>{
  try{
    const {userId}=req.params;
    const allTodos= await prismaClient.todo.findMany({where:{userId}});
    res.status(200).json({allTodos});
  }
  catch(error){
    res.sendStatus(500);
  }
})

app.listen(port, () => console.log(`http-server is listening on port : ${port}`));
