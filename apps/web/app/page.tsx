"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

   const [userInfo,setUserInfo]=useState({name:'',password:''});
   const router=useRouter();

   const handleSubmit=async ()=>{
     try{
       if(!userInfo.name || !userInfo.password){
        alert('please fill all fields.');
        return;
       }
       const res=await fetch('http://localhost:8080/user',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(userInfo)
       })
       const data=await res.json();
      router.push(`/todos/${data.userId}`);
     }
     catch(error){
      console.log('error: ',error);
     }
   }

  return (
   <div>
       <input type="text" placeholder="enter your name" value={userInfo.name} onChange={(e)=>setUserInfo({...userInfo,name:e.target.value})} />
        <br />
        <input type="text" placeholder="enter your password" value={userInfo.password} onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})} />
           <button onClick={handleSubmit}>Create User</button>
   </div>
  );
}
