import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../api/user";

export const ListComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userApi = new User();

  useEffect(async () => {
    await userApi.getUsers();
  }, []);

  return (
    <>
    <h2>Users List</h2>
    {users.length > 0 ? (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.email}</span>
            <span>{user.user_name} {user.last_name}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>No users found.</p>
    )}
    </>
  );
};