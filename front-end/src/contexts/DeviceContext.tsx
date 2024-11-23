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
  updateDeviceValue: (id: string, value: any) => void;
  updateDeviceStatus: (id: string, status: "ON" | "OFF") => void;
  updateDevicePassword: (id: string, password: string) => void;
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
      password: "1234",
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

  const updateDevice = (device: IDeviceProps) => {
    setDevices((prev) =>
      prev.map((prevDevice) =>
        prevDevice.id === device.id ? { ...prevDevice, ...device } : prevDevice
      )
    );
  };

  const updateDeviceValue = (id: string, value: any) => {
    const device = devices.find((device) => device.id === id);
    if (!device) return;
    updateDevice({ ...device, value });
  };

  const updateDevicePassword = (id: string, password: string) => {
    const device = devices.find((device) => device.id === id);
    if (!device) return;
    updateDevice({ ...device, password });
  };

  const updateDeviceStatus = (id: string, status: "ON" | "OFF") => {
    const device = devices.find((device) => device.id === id);
    if (!device) return;
    if (device.type === "relay" || device.type === "door") {
      updateDevice({
        ...device,
        value: status === "ON" ? "1" : "0",
        status,
      });
    } else if (device.type === "light") {
      updateDevice({
        ...device,
        value: status === "ON" ? "FFFFFF" : "000000",
        status,
      });
    } else if (device.type === "fan") {
      updateDevice({
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
