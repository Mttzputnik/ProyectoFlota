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
    
const handlechangen =(event)=>{
  setFormData({...FormData,[event.target.id]:event.target.value});
};

const handleAvatarChange =(event) => {
  setFormData({...FormData,avatar:event.target.files[0]})
}




  return (
    <div>CreateUserComponent</div>
  )
}
