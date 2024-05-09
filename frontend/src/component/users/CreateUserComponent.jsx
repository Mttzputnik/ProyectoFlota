import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../slices/userSlice'
import { User } from "../../api/user";

export const CreateUserComponent = () => {

  const dispatch = useDispatch();
  const userApi = new User();
  const [formData, setFormData] = useState({
    email: "",
    user_name: "",
    last_name: "",
    avatar: "",
    active_user: false,
    current_password: "" //debe coincidir con prisma validar
  })

  const handlechange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleAvatarChange = (event) => {
    setFormData({ ...formData, avatar: event.target.files[0] })
  }

  const handlePasswordChange = (event) => {
    setFormData({ ...formData, current_password: event.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("user_name", formData.user_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("avatar", formData.avatar);
      formDataToSend.append("current_password", formData.current_password);

      console.log(formDataToSend);

      await userApi.createUser(formDataToSend);
      dispatch(addUser(formData));
      setFormData({
        email: "",
        user_name: "",
        last_name: "",
        avatar: "",
        active_user: false,
        current_password: ""
      });


    } catch (error) {
      console.error(error);
    }



  }



  return (
    <>
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser} encType='multipart/form-data'>
        <div>
          <label htmlFor='email'>Email</label>
          <input type="email" id='email' value={formData.email} onChange={handlechange} required />

        </div>
        <div>
          <label htmlFor='user_name'>Nombre(s)</label>
          <input type="text" id='user_name' value={formData.user_name} onChange={handlechange} required />
        </div>
        <div>
          <label htmlFor='last_name'>Apellido(s)</label>
          <input type="text" id='last_name' value={formData.last_name} onChange={handlechange} required />
        </div>
        <div>
          <label htmlFor='avatar'>avatar</label>
          <input type="file" id='avatar' onChange={handleAvatarChange} accept='image/*' />
        </div>
        <div>
          <label htmlFor='current_password'>Password</label>
          <input type="password" id='current_password' value={formData.current_password} onChange={handlePasswordChange} required />
        </div>

        <button type='submit'>Create User</button>
      </form>

    </>
  )
}
