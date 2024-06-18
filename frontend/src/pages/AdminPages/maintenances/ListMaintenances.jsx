import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Maintenance } from "../../../api/maintenance";
import { getMaintenances, editMaintenanceById, deleteMaintenanceById} from "../../../slices/maintenanceSlice";
import { Table, Space, Tooltip, Modal, Form, Input, InputNumber, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const ListMaintenance = () => {
  const dispatch = useDispatch();
  const maintenances = useSelector((state) => state.maintenance.maintenances);
  const maintenanceApi = useMemo(() => new Maintenance(), []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const maintenancesData = await maintenanceApi.getMaintenances();
        dispatch(getMaintenances(maintenancesData));
      } catch (error) {
        console.error("Failed to fetch maintenances", error);
      }
    };

    fetchMaintenances();
  }, [maintenanceApi, dispatch]);

  const handleEdit = (id) => {
    const maintenance = maintenances.find((maintenance) => maintenance.id === id);
    setSelectedMaintenance(maintenance);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Seguro quieres eliminar este mantenimiento?",
      content: "Esta opción no se puede revertir",
      onOk() {
        maintenanceApi
          .deleteMaintenanceById(id)
          .then(() => {
            dispatch(deleteMaintenanceById(id));
          })
          .catch((error) => {
            console.error("Failed to delete maintenance", error);
          });
      },
      onCancel() {
        console.log("Cancel delete");
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedMaintenance(null);
  };

  const handleOk = () => {
    maintenanceApi
      .editMaintenanceById(selectedMaintenance.id, selectedMaintenance)
      .then((result) => {
        dispatch(editMaintenanceById({ maintenanceId: selectedMaintenance.id, updatedMaintenanceData: result }));
        setIsModalVisible(false);
        setSelectedMaintenance(null);
      })
      .catch((error) => {
        console.error("Failed to edit maintenance", error);
      });
  };

  const handleChange = (e) => {
    setSelectedMaintenance({
      ...selectedMaintenance,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setSelectedMaintenance({
      ...selectedMaintenance,
      date: dateString,
    });
  };

  const handleCostChange = (value) => {
    setSelectedMaintenance({
      ...selectedMaintenance,
      cost: value,
    });
  };

  const handleSwitchChange = (checked) => {
    setSelectedMaintenance({
      ...selectedMaintenance,
      status: checked,
    });
  };

  const columns = [
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Costo",
      dataIndex: "cost",
      key: "cost",
      render: (text) => `$${text}`,
    },
    {
      title: "Activo",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <span>{record.status ? "Sí" : "No"}</span>,
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
      <h2>Lista de Mantenimientos</h2>
      <Table dataSource={maintenances} columns={columns} rowKey="id" />
      {selectedMaintenance && (
        <Modal
          title="Editar Mantenimiento"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item label="Descripción">
              <Input
                name="description"
                value={selectedMaintenance.description}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Fecha">
            <input type="date" name="date" value={selectedMaintenance.date} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Costo">
              <InputNumber
                min={0}
                value={selectedMaintenance.cost}
                onChange={handleCostChange}
                formatter={value => `$ ${value}`}
              />
            </Form.Item>
            <Form.Item label="Activo">
              <Switch
                checked={selectedMaintenance.status}
                onChange={handleSwitchChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};
