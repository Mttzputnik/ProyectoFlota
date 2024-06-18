import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tire } from "../../../api/tire";
import { getTires, editTireById, deleteTireById } from "../../../slices/tireSlice";
import {
  Table,
  Image,
  Space,
  Tooltip,
  Modal,
  Form,
  Input,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const ListTires = () => {
  const dispatch = useDispatch();
  const tires = useSelector((state) => state.tire.tires);
  const tireApi = useMemo(() => new Tire(), []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTire, setSelectedTire] = useState(null);

  useEffect(() => {
    const fetchTires = async () => {
      try {
        const tiresData = await tireApi.getTires();
        dispatch(getTires(tiresData));
      } catch (error) {
        console.error("Failed to fetch tires", error);
      }
    };

    fetchTires();
  }, [tireApi, dispatch]);

  const handleEdit = (id) => {
    const tire = tires.find((tire) => tire.id === id);
    setSelectedTire(tire);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: "¿Seguro quieres eliminar esta llanta?",
      content: "Esta opción no se puede revertir",
      onOk() {
        tireApi
          .deleteTireById(id)
          .then(() => {
            dispatch(deleteTireById(id));
          })
          .catch((error) => {
            console.error("Failed to delete tire", error);
          });
      },
      onCancel() {
        console.log("Cancel delete");
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTire(null);
  };

  const handleOk = () => {
    tireApi
      .editTireById(selectedTire.id, selectedTire)
      .then((result) => {
        dispatch(editTireById({ tireId: selectedTire.id, updatedTireData: result }));
        setIsModalVisible(false);
        setSelectedTire(null);
      })
      .catch((error) => {
        console.error("Failed to edit tire", error);
      });
  };

  const handleChange = (e) => {
    setSelectedTire({
      ...selectedTire,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Fecha de Instalación",
      dataIndex: "installationDate",
      key: "installationDate",
    },
    {
      title: "Kilometraje",
      dataIndex: "mileage",
      key: "mileage",
    },
    {
      title: "Desgaste",
      dataIndex: "wear",
      key: "wear",
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
      <h2>Lista de Llantas</h2>
      <Table dataSource={tires} columns={columns} rowKey="id" />
      {selectedTire && (
        <Modal
          title="Editar Llanta"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Form>
            <Form.Item label="Marca">
              <Input
                name="brand"
                value={selectedTire.brand}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Modelo">
              <Input
                name="model"
                value={selectedTire.model}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Fecha de Instalación">
              <Input
                name="installationDate"
                type="date"
                value={selectedTire.installationDate}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Kilometraje">
              <Input
                name="mileage"
                type="number"
                value={selectedTire.mileage}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Desgaste">
              <Input
                name="wear"
                type="number"
                step="0.01"
                value={selectedTire.wear}
                onChange={handleChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};
