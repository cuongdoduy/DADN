import React from "react";
import { IDeviceProps } from "../interfaces/device.interface";
import { Switch, Typography } from "@material-tailwind/react";
import { LightModal } from "./pop-up/LightPopUp";
import { FanModal } from "./pop-up/FanPopUp";
import { DoorModal } from "./pop-up/DoorPopup";

const BaseDevice = ({
  icon,
  name,
  status = "",
}: {
  icon: string | React.ReactNode;
  name: string;
  status?: string;
}) => {
  return (
    <div className="gap-y-4 grid grid-cols-1 col-span-2">
      <Typography as={"p"} className="text-body font-semibold uppercase">
        {status}
      </Typography>
      <div>
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt="icon"
            className="w-full h-full w-[36px] h-[36px]"
          />
        ) : (
          icon
        )}
      </div>
      <Typography as={"p"} className="text-body font-semibold">
        {name}
      </Typography>
    </div>
  );
};

const DeviceSwitch = ({
  value,
  handleChangeStatus,
}: {
  value: string;
  handleChangeStatus: (value: "ON" | "OFF") => void;
}) => {
  return (
    <div className="ml-auto col-span-4">
      <Switch
        checked={value === "ON"}
        onChange={() => handleChangeStatus(value === "ON" ? "OFF" : "ON")}
        className="w-full h-full"
        color="blue"
      />
    </div>
  );
};

const RelayDevice: React.FC<IDeviceProps> = ({
  activeIcon,
  name,
  status,
  index,
  handleChangeStatus,
  inactiveIcon,
}) => {
  return (
    <div
      className={`w-full max-w-sm bg-white px-4 py-4 rounded-lg grid grid-cols-6 shadow-md ${
        index % 2 === 0 ? "mr-auto" : "ml-auto"
      }`}
    >
      <BaseDevice
        icon={status === "ON" ? activeIcon : inactiveIcon}
        name={name}
        status={status}
      />
      <DeviceSwitch value={status} handleChangeStatus={handleChangeStatus} />
    </div>
  );
};

const LightDevice: React.FC<IDeviceProps> = ({
  activeIcon,
  name,
  handleChangeValue,
  value,
  status,
  index,
  handleChangeStatus,
  inactiveIcon,
}) => {
  //hex color list
  const listColors = [
    "#9659D4",
    "#F472B6",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
  ];

  const handleChangeLightColor = (color: string) => {
    const hex = color.replace("#", "");
    handleChangeValue(hex);
  }

  return (
    <div
      className={`w-full max-w-sm bg-white px-4 py-4 rounded-lg grid grid-cols-6 shadow-md ${
        index % 2 === 0 ? "mr-auto" : "ml-auto"
      }`}
    >
      <BaseDevice
        icon={status === "ON" ? activeIcon : inactiveIcon}
        name={name}
        status={status}
      />
      <div className="col-span-4 flex flex-col justify-between">
        <DeviceSwitch value={status} handleChangeStatus={handleChangeStatus} />
        <LightModal value={`#${value}`} listColors={listColors} handleChangeLightColor={handleChangeLightColor}/>
      </div>
    </div>
  );
};

const FanDevice: React.FC<IDeviceProps> = ({
  activeIcon,
  name,
  handleChangeValue,
  value,
  index,
  status,
  inactiveIcon,
  handleChangeStatus,
}) => {
  const handleChangeFanSpeed = (speed: string) => {
    handleChangeValue(speed);
  }
  return (
    <div
      className={`w-full max-w-sm bg-white px-4 py-4 rounded-lg grid grid-cols-6 shadow-md ${
        index % 2 === 0 ? "mr-auto" : "ml-auto"
      }`}
    >
      <BaseDevice
        icon={status === "ON" ? activeIcon : inactiveIcon}
        name={name}
        status={status}
      />
      <div className="col-span-4 flex flex-col justify-between">
        <DeviceSwitch value={status} handleChangeStatus={handleChangeStatus} />
        <FanModal value={value} handleChangeFanSpeed={handleChangeFanSpeed} />
      </div>
    </div>
  );
};

const DoorDevice: React.FC<IDeviceProps> = ({
  activeIcon,
  name,
  handleChangeStatus,
  inactiveIcon,
  index,
  status,
  handleChangePassword,
  password,
}) => {
  return (
    <div
      className={`w-full max-w-sm bg-white px-4 py-4 rounded-lg grid grid-cols-6 shadow-md ${
        index % 2 === 0 ? "mr-auto" : "ml-auto"
      }`}
    >
      <BaseDevice
        icon={status === "ON" ? activeIcon : inactiveIcon}
        name={name}
        status={status === "ON" ? "Unlock" : "Lock"}
      />
      <div className="col-span-4 flex flex-col justify-between">
        <DeviceSwitch value={status} handleChangeStatus={handleChangeStatus} />
        <DoorModal password={password||""} handleChangeDoorPassword={handleChangePassword} />
      </div>
    </div>
  );
};

const Device: React.FC<IDeviceProps> = (props) => {
  return props.type === "relay" ? (
    <RelayDevice {...props} />
  ) : props.type === "light" ? (
    <LightDevice {...props} />
  ) : props.type === "door" ? (
    <DoorDevice {...props} />
  ) : props.type === "fan" ? (
    <FanDevice {...props} />
  ) : (
    <div>
      <Typography as={"p"}>Device not found</Typography>
    </div>
  );
};

export default Device;
