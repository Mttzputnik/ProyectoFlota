import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { AddUser } from '../../slices/userSlice'
import { User } from "../../api/user";

export const CreateUserComponent = () => {

  const dispatch = useDispatch();
  const userApi= new User();
  const [FormData,setFormData] =useState({
    email:"",
    user_name:"",
    last_name:"",
    avatar:"",
    active_user:false,
    current_password:"" //debe coincidir con prisma validar
  })
    
const handlechange =(event)=>{
  setFormData({...FormData,[event.target.id]:event.target.value});
};

const handleAvatarChange =(event) => {
  setFormData({...FormData,avatar:event.target.files[0]})
}


const handleCreateUser = async (e)=> {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("email",FormData.email);
    formDataToSend.append("user_name",FormData.user_name);
    formDataToSend.append("last_name",FormData.last_name);
    formDataToSend.append("avatar", FormData.avatar);
    formDataToSend.append("current_password",FormData.current_password);

    console.log(formDataToSend);


  } catch (error) {
    
  }



}



  return (
    <>
    <h2>Create User</h2>
    <form onSubmit={handleCreateUser} encType='multipart/form-data'>
      <div>
        <label htmlFor='email'>Email</label>
        <input type="email" id='email' value={FormData.email} onChange={handlechange} defaultValue={'test@test.co'} required/>
        
      </div>
      <div>
        <label htmlFor='user_name'>Nombre(s)</label>
          <input type="text" id='user_name' value={FormData.user_name} onChange={handlechange} defaultValue={'john'} required/>
      </div>
      <div>
        <label htmlFor='last_name'>Apellido(s)</label>
          <input type="text" id='last_name' value={FormData.last_name} onChange={handlechange} defaultValue={'doe'} required/>
      </div>
      <div>
        <label htmlFor='avatar'>avatar</label>
          <input type="file" id='avatar' value={FormData.avatar} onChange={handleAvatarChange} accept='image/*'/>
      </div>
      <div>
        <label htmlFor='current_password'>Password</label>
          <input type="password" id='current_password' value={FormData.current_password} onChange={handleAvatarChange} required/>
      </div>

      <button type='submit'>Create User</button>
    </form>
    
    </>
  )
}
