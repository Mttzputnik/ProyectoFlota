import React, {userEffect} from 'react'
import { useDispatch } from 'react-redux'
import { AddUser } from '../../slices/userSlice'

export const CreateUserComponent = () => {

  const dispatch = useDispatch();
  
    userEffect (async() => {
      await dispatch();
        console.log("hello");
    }, []);

  return (
    <div>CreateUserComponent</div>
  )
}
