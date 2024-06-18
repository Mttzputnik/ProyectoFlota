import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, editTaskById } from '../../slices/taskSlice';
import { getUsers } from '../../slices/userSlice';
import { getLists } from '../../slices/listSlice';
import { Select } from 'antd';
import { Task } from '../../api/task';
import { User } from '../../api/user';
import { List } from '../../api/list';
import './TaskDrivers.css';

const { Option } = Select;

export const DragAndDrop = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.task.tasks) || [];
  const users = useSelector(state => state.user.users) || [];
  const lists = useSelector(state => state.list.lists) || [];
  const taskApi = new Task(); 
  const userApi = new User(); 
  const listApi = new List(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, usersData, listsData] = await Promise.all([
          taskApi.getTasks(),
          userApi.getUsers(),
          listApi.getLists(),
        ]);

        dispatch(getTasks(tasksData));
        dispatch(getUsers(usersData));
        dispatch(getLists(listsData));
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, [taskApi, userApi, listApi, dispatch]);

const getList = (listId) => {
    return tasks.filter(task => task.idList === listId);
  }

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item.id);
    console.log(item);
  }

  const draggingOver = (evt) => {
    evt.preventDefault();
  }

  const onDrop = async (evt, listId) => {
    const itemID = evt.dataTransfer.getData('itemID');
    const item = tasks.find(task => task.id === itemID);
    if (item) {
      item.idList = listId;

      try {
        await taskApi.editTaskById(item.id, item);
        dispatch(editTaskById(item));
      } catch (error) {
        console.error("Error al editar la tarea", error);
      }
    }
  }

  const assignUser = async (taskId, userId) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      task.idUser = userId;
      try {
        await taskApi.editTaskById(task.id, task);
        dispatch(editTaskById(task));
      } catch (error) {
        console.error("Error al asignar usuario a la tarea", error);
      }
    }
  }

  // Verificar si los datos están cargando
  if (!tasks || !users || !lists) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1>Tareas de conductores &nbsp;</h1>
      <br />

      <div className='drag-and-drop'>
        {lists.map(list => (
          <div className={`column column--${list.id}`} key={list.id}>
            <h3>{list.name}</h3>
            <div className='dd-zone' onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, list.id)}>
              {getList(list.id).map(item => (
                <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                  <strong className='title'>{item.desc}</strong>
                  <Select
                    placeholder="Asignar Usuario"
                    onChange={(value) => assignUser(item.id, value)}
                    style={{ width: '100%' }}
                    value={item.idUser}
                  >
                    {users.map(user => (
                      <Option key={user.id} value={user.id}>
                        {user.email}
                      </Option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DragAndDrop;
