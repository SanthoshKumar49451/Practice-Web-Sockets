
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'

const App = () => {
  const socket=io('localhost:3000')
  function socketon(){
    socket.on('connection',{})
    console.log("socket")
  }
  const [data,setData]=useState({
    name:'',
    age:''
  })
  const [crudData,setCruData]=useState([])
  function handleinput(event){
    const{name,value}=event.target
    setData(prev=>({...prev,[name]:value}))

  }

  const handleSubmit=()=>{
    console.log("working")
    socket.emit('data',data)
    setData({
      name:'',
      age:''
    })
  }
  useEffect(()=>{
    socketon()
    socket.on('read',(data)=>{
      setCruData(data)
      console.log(crudData)
    })
  },[socket])

  


 



  return (
    <div className='dash' >
      <p>CRUD Operations using WebSockets</p>
      <input placeholder='Enter your Name' className='input-field' type='text' onChange={handleinput} name='name' value={data.name} />
      <input placeholder='Enter your age' className='input-field' type='text' onChange={handleinput} name='age' value={data.age} />
      <button onClick={handleSubmit} >
        Add Data
      </button>
      <div>
        {crudData.length>0?<table>
  <tr>
    <th>Name</th>
    <th>age</th>
   
  </tr>
  {
    crudData.map((item,index)=>(
      <tr key={index} >
        <td>{item.name}</td>
        <td>{item.age}</td>
      </tr>
    ))
  }
 
</table>:<></>}
      </div>
    </div>
  )
}

export default App
