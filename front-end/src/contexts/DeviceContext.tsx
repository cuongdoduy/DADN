import axios from "axios";
import React, { createContext, useState, ReactNode } from "react";

export interface IDeviceProps {
  id: string;
  name: string;
  status: "ON" | "OFF";
  value: any;
  room_id: string;
  type: "base" | "relay" | "fan" | "light" | "door";
  password?: string;
}

interface IDeviceContext {
  devices: IDeviceProps[];
  updateDeviceValue: (id: string, value: any) => Promise<void>;
  updateDeviceStatus: (id: string, status: "ON" | "OFF") => Promise<void>;
  updateDevicePassword: (id: string, password: string) => Promise<void>;
}

export const DeviceContext = createContext<IDeviceContext | undefined>(
  undefined
);

interface IDeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<IDeviceProviderProps> = ({
  children,
}) => {
  const [devices, setDevices] = useState<IDeviceProps[]>([
    {
      id: "1",
      name: "Light",
      status: "ON",
      value: "FFFFFF",
      room_id: "1",
      type: "light",
    },
    {
      id: "2",
      name: "Fan",
      status: "ON",
      value: "50",
      room_id: "1",
      type: "fan",
    },
    {
      id: "3",
      name: "Relay",
      status: "ON",
      value: "1",
      room_id: "1",
      type: "relay",
    },
    {
      id: "4",
      name: "Door",
      status: "ON",
      value: "0",
      password: "123456",
      room_id: "1",
      type: "door",
    },
    {
      id: "5",
      name: "Light",
      status: "ON",
      value: "FFFFFF",
      room_id: "2",
      type: "light",
    },
    {
      id: "6",
      name: "Fan",
      status: "ON",
      value: "50",
      room_id: "2",
      type: "fan",
    },
    {
      id: "7",
      name: "Relay",
      status: "ON",
      value: "1",
      room_id: "2",
      type: "relay",
    },
  ]);

  const handlePublistChangePassword = async (device: IDeviceProps) => {
    const res = await axios.post("http://localhost:5000/api/client_to_server", {
      command_id: "CMD00010",
      command_name: "CONTROL_DEVICE",
      device_type: "DOOR_PASS",
      node_id: device.room_id === "1" ? "CentralNode" : "Node1",
      value: device.password,
    });
    console.log(res.data);
    updateDevice(device);
  }

  const handlePublistToAws = async (device: IDeviceProps) => {
    const res = await axios.post("http://localhost:5000/api/client_to_server", {
      command_id: "CMD00010",
      command_name: "CONTROL_DEVICE",
      device_type:
        device.type === "relay"
          ? "RELAY"
          : device.type === "door"
          ? "DOOR"
          : device.type === "light"
          ? "LED_RGB"
          : "FAN",
      node_id: device.room_id === "1" ? "CentralNode" : "Node1",
      value: device.value,
    });
    console.log(res.data);
    updateDevice(device);
  };

  const updateDevice = (device: IDeviceProps) => {
    setDevices((prev) =>
      prev.map((prevDevice) =>
        prevDevice.id === device.id ? { ...prevDevice, ...device } : prevDevice
      )
    );
  };

  const updateDeviceValue = async (id: string, value: any) => {
    const device = devices.find((device) => device.id === id);
    if (!device) return;
    await handlePublistToAws({ ...device, value });
  };

  const updateDevicePassword = async (id: string, password: string) => {
    const device = devices.find((device) => device.id === id);
    if (!device) return;
    await handlePublistChangePassword({ ...device, password });
  };

  const updateDeviceStatus = async (id: string, status: "ON" | "OFF") => {
    const device = devices.find((device) => device.id === id);
    if (!device) return;
    if (device.type === "relay" || device.type === "door") {
      await handlePublistToAws({
        ...device,
        value: status === "ON" ? "1" : "0",
        status,
      });
    } else if (device.type === "light") {
      await handlePublistToAws({
        ...device,
        value: status === "ON" ? "FFFFFF" : "000000",
        status,
      });
    } else if (device.type === "fan") {
      await handlePublistToAws({
        ...device,
        value: status === "ON" ? "50" : "0",
        status,
      });
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        updateDeviceValue,
        updateDeviceStatus,
        updateDevicePassword,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
