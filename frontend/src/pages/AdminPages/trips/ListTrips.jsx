import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trip } from '../../../api/trip';
import { Vehicle } from '../../../api/vehicle';
import { User } from '../../../api/user';
import { addTrip, getTrips } from '../../../slices/tripslice';
import { getVehicles } from '../../../slices/vehicleSlice';
import { getUsers } from '../../../slices/userSlice';
import { Button, Form, Input, Select, Table, DatePicker } from 'antd';
import moment from 'moment';
import GoogleMapComponent from './GoogleMapComponent';  // Importar el componente del mapa

const { Option } = Select;

export const ListTrips = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const vehicles = useSelector(state => state.vehicle.vehicles);
  const trips = useSelector(state => state.trip.trips);
  const users = useSelector(state => state.user.users);
  const tripApi = useMemo(() => new Trip(), []);
  const vehicleApi = useMemo(() => new Vehicle(), []);
  const userApi = useMemo(() => new User(), []);

  const [optimizedRoute, setOptimizedRoute] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripsData, vehiclesData, usersData] = await Promise.all([
          tripApi.getTrips(),
          vehicleApi.getVehicles(),
          userApi.getUsers(),
        ]);

        dispatch(getTrips(tripsData));
        dispatch(getVehicles(vehiclesData));
        dispatch(getUsers(usersData));
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, [tripApi, vehicleApi, userApi, dispatch]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Convertir las fechas de Moment.js a Date de JavaScript
      const dataToSend = {
        ...values,
        startDate: moment(values.startDate).toDate(),
        endDate: moment(values.endDate).toDate(),
        route: optimizedRoute, // Agregar la ruta optimizada
      };

      const trip = await tripApi.createTrip(dataToSend);
      dispatch(addTrip(trip));
      form.resetFields();
    } catch (error) {
      console.error("Error al agregar el viaje", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Vehículo', dataIndex: ['vehicle', 'brand'], key: 'vehicle' },
    { title: 'Ruta', dataIndex: 'route', key: 'route' },
    { title: 'Distancia Recorrida (km)', dataIndex: 'distanceTraveled', key: 'distanceTraveled' },
    { title: 'Tiempo de Viaje (horas)', dataIndex: 'travelTime', key: 'travelTime' },
    { title: 'Usuario', dataIndex: ['user', 'email'], key: 'user' },
    { title: 'Fecha de Inicio', dataIndex: 'startDate', key: 'startDate', render: (text) => new Date(text).toLocaleString() },
    { title: 'Fecha de Fin', dataIndex: 'endDate', key: 'endDate', render: (text) => new Date(text).toLocaleString() },
    { title: 'Creado en', dataIndex: 'createdAt', key: 'createdAt', render: (text) => new Date(text).toLocaleString() },
  ];

  const handleRouteCalculated = (route) => {
    setOptimizedRoute(route);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Vehículo" name="vehicleId" rules={[{ required: true, message: 'Por favor seleccione un vehículo' }]}>
          <Select placeholder="Seleccione un vehículo">
            {vehicles && vehicles.map(vehicle => (
              <Option key={vehicle.id} value={vehicle.id}>
                {vehicle.brand} {vehicle.model}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Usuario" name="userId" rules={[{ required: true, message: 'Por favor seleccione un usuario' }]}>
          <Select placeholder="Seleccione un usuario">
            {users && users.map(user => (
              <Option key={user.id} value={user.id}>
                {user.email}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Fecha de Inicio" name="startDate" rules={[{ required: true, message: 'Por favor ingrese la fecha de inicio' }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="Fecha de Fin" name="endDate" rules={[{ required: true, message: 'Por favor ingrese la fecha de fin' }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="Distancia Recorrida (km)" name="distanceTraveled" rules={[{ required: true, message: 'Por favor ingrese la distancia recorrida' }]}>
          <Input placeholder="Ingrese la distancia" />
        </Form.Item>
        <Form.Item label="Tiempo de Viaje (horas)" name="travelTime" rules={[{ required: true, message: 'Por favor ingrese el tiempo de viaje' }]}>
          <Input placeholder="Ingrese el tiempo de viaje" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Agregar Viaje
          </Button>
        </Form.Item>
      </Form>

      <GoogleMapComponent onRouteCalculated={handleRouteCalculated} />  {/* Añadir el componente del mapa */}

      <Table dataSource={trips} columns={columns} rowKey="id" />
    </div>
  );
};
