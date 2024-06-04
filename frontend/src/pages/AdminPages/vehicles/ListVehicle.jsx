import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Vehicle } from "../../../api/vehicle";
import { getVehicles, editVehicleById, deleteVehicleById } from "../../../slices/vehicleSlice";
import {
  Table,
  Image,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  Switch,
  Upload,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";


const { confirm } = Modal;

export const ListVehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicle.vehicles);
  const vehicleApi = new Vehicle();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const vehicleApi = new Vehicle();
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
    const vehicleApi = new Vehicle();
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

  const handleUploadChange = (info) => {
    const file = info.file.originFileObj || info.file;
    setSelectedVehicle({
      ...selectedVehicle,
      image: file,
    });
  };


  const columns = [
    {
      title: "imagen",
      dataIndex: "image",
      key: "image",
      render: (text, record) => <Image src={record.image} />
    },

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
      dataIndex: "licensePlate",
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
                value={selectedVehicle.licensePlate}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Activo">
              <Switch
                checked={selectedVehicle.active_vehicle}
                onChange={handleSwitchChange}
              />
            </Form.Item>
            <Form.Item label="Image">
              <Upload
                accept="image/*"
                beforeUpload={() => false}
                onChange={handleUploadChange}
                fileList={[]}>
                <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};