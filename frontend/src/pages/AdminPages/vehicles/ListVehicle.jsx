import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Vehicle } from "../../../api/vehicle"; // Asegúrate de ajustar la importación a la ruta correcta
import { getVehicles, editVehicleById, deleteVehicleById } from "../../../slices/vehicleSlice"; // Ajusta las acciones de Redux a la ruta correcta
import {
  Table,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  Switch,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const ListVehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicle.vehicles);
  const vehicleApi = new Vehicle();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await vehicleApi.getVehicles();
        dispatch(getVehicles(vehiclesData));
      } catch (error) {
        console.error("Failed to fetch vehicles", error);
      }
    };

    fetchVehicles();
  }, [dispatch]);

  const handleEdit = (id) => {
    const vehicle = vehicles.find((vehicle) => vehicle.id === id);
    setSelectedVehicle(vehicle);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Seguro quieres eliminar este vehículo?",
      content: "Esta opción no se puede revertir",
      onOk() {
        vehicleApi
          .deleteVehicleById(id)
          .then(() => {
            dispatch(deleteVehicleById(id));
          })
          .catch((error) => {
            console.error("Failed to delete vehicle", error);
          });
      },
      onCancel() {
        console.log("Cancel delete");
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVehicle(null);
  };

  const handleOk = () => {
    vehicleApi
      .editVehicleById(selectedVehicle.id, selectedVehicle)
      .then((result) => {
        dispatch(editVehicleById({ vehicleId: selectedVehicle.id, updatedVehicleData: result }));
        setIsModalVisible(false);
        setSelectedVehicle(null);
      })
      .catch((error) => {
        console.error("Failed to edit vehicle", error);
      });
  };

  const handleChange = (e) => {
    setSelectedVehicle({
      ...selectedVehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitchChange = (checked) => {
    setSelectedVehicle({
      ...selectedVehicle,
      active_vehicle: checked,
    });
  };

  const columns = [
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Placa",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "Activo",
      dataIndex: "active_vehicle",
      key: "active_vehicle",
      render: (text, record) => (
        <span>{record.active_vehicle ? "Sí" : "No"}</span>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Editar">
            <EditOutlined
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleEdit(record.id)}
            />
          </Tooltip>
          <Tooltip title="Eliminar">
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Lista de Vehículos</h2>
      <Table dataSource={vehicles} columns={columns} rowKey="id" />
      {selectedVehicle && (
        <Modal
          title="Editar Vehículo"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Form>
            <Form.Item label="Modelo">
              <Input
                name="model"
                value={selectedVehicle.model}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Marca">
              <Input
                name="brand"
                value={selectedVehicle.brand}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Placa">
              <Input
                name="plate"
                value={selectedVehicle.plate}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Activo">
              <Switch
                checked={selectedVehicle.active_vehicle}
                onChange={handleSwitchChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};
