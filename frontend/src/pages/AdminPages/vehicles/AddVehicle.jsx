import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addVehicle } from '../../../slices/vehicleSlice';
import { Vehicle } from '../../../api/vehicle';
import { Button, Form, Input, Switch, Upload, Select } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

export const AddVehicle = () => {
  const dispatch = useDispatch();
  const vehicleApi = new Vehicle();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'image' && values.image) {
          formData.append(key, values.image.file.originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      });

      const vehicle = await vehicleApi.createVehicle(formData);
      dispatch(addVehicle(vehicle));
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Failed to add vehicle", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = (info) => {
    setFileList(info.fileList);
    form.setFieldsValue({ image: info.fileList[0] });
  };

  const handleSwitchChange = (checked) => {
    form.setFieldsValue({ active_vehicle: checked });
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ active_vehicle: true }}>
      <Form.Item label="Marca" name="brand" rules={[{ required: true, message: 'Por favor ingrese la marca del vehículo' }]}>
        <Input placeholder="Ingrese la marca del vehículo" />
      </Form.Item>
      <Form.Item label="Modelo" name="model" rules={[{ required: true, message: 'Por favor ingrese el modelo del vehículo' }]}>
        <Input placeholder="Ingrese el modelo del vehículo" />
      </Form.Item>
      <Form.Item label="Año" name="year" rules={[{ required: true, message: 'Por favor ingrese el año del vehículo' }]}>
        <Input placeholder="Ingrese el año del vehículo" />
      </Form.Item>
      <Form.Item label="Tipo de combustible" name="fuelType" rules={[{ required: true, message: 'Por favor ingrese el tipo de combustible del vehículo' }]}>
        <Select placeholder="Seleccione el tipo de combustible">
          <Option value="gasolina">Gasolina</Option>
          <Option value="diesel">Diésel</Option>
          <Option value="gas">Gas</Option>
          <Option value="electrico">Eléctrico</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Placa" name="licensePlate" rules={[{ required: true, message: 'Por favor ingrese la placa del vehículo' }]}>
        <Input placeholder="Ingrese la placa del vehículo" />
      </Form.Item>
      <Form.Item label="Kilometraje" name="mileage" rules={[{ required: true, message: 'Por favor ingrese el kilometraje del vehículo' }]}>
        <Input placeholder="Ingrese el kilometraje del vehículo" />
      </Form.Item>
      <Form.Item label="Activo" name="active_vehicle" valuePropName="checked">
        <Switch onChange={handleSwitchChange} />
      </Form.Item>
      <Form.Item label="Imagen" name="image">
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          onChange={handleUploadChange}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Crear vehículo
        </Button>
      </Form.Item>
    </Form>
  );
};
