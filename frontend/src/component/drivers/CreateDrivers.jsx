import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import { Task } from '../../api/task';
import { User } from '../../api/user';
import { List } from '../../api/list';
import { createTask } from '../../slices/taskSlice';
import { getUsers } from '../../slices/userSlice';
import { getLists } from '../../slices/listSlice';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

export const CreateDrivers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Usar useNavigate
  const taskApi = useMemo(() => new Task(), []);
  const userApi = useMemo(() => new User(), []);
  const listApi = useMemo(() => new List(), []);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const users = useSelector(state => state.user.users);
  const lists = useSelector(state => state.list.lists);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, listsData] = await Promise.all([
          userApi.getUsers(),
          listApi.getLists(),
        ]);

        dispatch(getUsers(usersData));
        dispatch(getLists(listsData));
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, [userApi, listApi, dispatch]);

  const onFinish = async (values) => {
    console.log("values", values);
    setLoading(true);
    try {
      const task = await taskApi.createTask(values);
      dispatch(createTask(task));
      form.resetFields();
      navigate('/CreateTrips'); 
    } catch (error) {
      console.error("Error al agregar la tarea", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="Usuario" name="idUser" rules={[{ required: true, message: 'Por favor seleccione un usuario' }]}>
        <Select placeholder="Seleccione un usuario">
          {users && users.map(user => (
            <Option key={user.id} value={user.id}>
              {user.email}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Lista" name="idList" rules={[{ required: true, message: 'Por favor seleccione una lista' }]}>
        <Select placeholder="Seleccione una lista">
          {lists && lists.map(list => (
            <Option key={list.id} value={list.id}>
              {list.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Descripción" name="desc" rules={[{ required: true, message: 'Por favor ingrese la descripción de la tarea' }]}>
        <Input placeholder="Ingrese la descripción de la tarea" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Crear Tarea
        </Button>
      </Form.Item>
    </Form>
  );
};
