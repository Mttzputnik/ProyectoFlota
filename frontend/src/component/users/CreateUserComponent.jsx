import React, {userEffect} from 'react'

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
