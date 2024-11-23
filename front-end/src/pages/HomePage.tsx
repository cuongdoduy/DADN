import { Option, Select, Typography } from "@material-tailwind/react";
import NavbarCustom from "../components/Header";
import React, { useContext } from "react";
import Device from "../components/Device";
import { DeviceContext } from "../contexts/DeviceContext";

const HomePage = () => {
  const {
    devices,
    updateDeviceStatus,
    updateDeviceValue,
    updateDevicePassword,
  } = useContext(DeviceContext) || {
    devices: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateDeviceStatus: (id: string, status: "ON" | "OFF") => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateDeviceValue: (id: string, value: any) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateDevicePassword: (id: string, password: string) => {},
  };

  const [room, setRoom] = React.useState<string>("1");

  const getIconUrl = (name: string) => {
    switch (name.toLowerCase()) {
      case "light":
        return "/light.svg";
      case "fan":
        return "/fan.svg";
      case "relay":
        return "/relay.svg";
      case "door":
        return "/door_active.svg";
      default:
        return "/light.svg";
    }
  };

  const getIconInactiveUrl = (name: string) => {
    switch (name.toLowerCase()) {
      case "light":
        return "/light_inactive.svg";
      case "fan":
        return "/fan_inactive.svg";
      case "relay":
        return "/relay_inactive.svg";
      case "door":
        return "/door_inactive.svg";
      default:
        return "/light_inactive.svg";
    }
  };

  return (
    <div>
      <NavbarCustom />
      <main className="bg-[#F3F4F4] min-h-[100vh]">
        <div className="w-[80%] mx-auto py-[20px]">
          <div className="bg-white w-full rounded-[12px] grid grid-cols-2 items-center py-[20px] px-[20px]">
            <div>
              <div>
                <Typography
                  as={"h1"}
                  className="text-2xl font-semibold py-4 px-6"
                >
                  Hello
                </Typography>
                <Typography as={"p"} className="text-body px-6 text-gray-600">
                  Welcome home, air quality is good and Fresh. Take a walk and
                  have coffee.
                </Typography>
              </div>
              {/* <div className="px-6 py-2 flex space-x-2 items-center">
                <img
                  src="/door.svg"
                  alt="logo"
                  className="w-full h-full w-[24px] h-[24px]"
                />
                <Typography
                  as={"p"}
                  className="text-body text-gray-600 font-semibold"
                >
                  Your door is currently {doorStatus ? "unlocked" : "locked"}
                </Typography>
              </div> */}
              {/* <div className="flex gap-x-8 my-2 px-6">
                {doorStatus ? (
                  <>
                    <Button
                      className="bg-primary text-body text-gray-600 font-semibold w-full flex items-center space-x-2 justify-center text-white"
                      onClick={handleChangeDoorStatus}
                    >
                      <LockClosedIcon className="w-full h-full w-[20px] h-[20px]" />
                      <p>Lock</p>
                    </Button>
                    <Button
                      className="bg-white text-body text-gray-600 font-semibold w-full flex items-center space-x-2 border-[2px] border-gray-400 justify-center"
                      disabled={true}
                    >
                      <LockOpenIcon className="w-full h-full w-[20px] h-[20px]" />
                      <p>UnLock</p>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="bg-white text-body text-gray-600 font-semibold w-full flex items-center space-x-2 border-[2px] border-gray-400 justify-center"
                      disabled={true}
                      onClick={handleChangeDoorStatus}
                    >
                      <img
                        src="/locked_disable.svg"
                        alt="logo"
                        className="w-full h-full w-[20px] h-[20px]"
                      />
                      <p>Locked</p>
                    </Button>
                    <Button
                      className="bg-primary text-body text-gray-600 font-semibold w-full flex items-center space-x-2 justify-center text-white"
                      onClick={handleChangeDoorStatus}
                    >
                      <img
                        src="/unlocked_active.svg"
                        alt="logo"
                        className="w-full h-full w-[20px] h-[20px]"
                      />
                      <p>UnLock</p>
                    </Button>
                  </>
                )}
              </div> */}
            </div>
            <div className="ml-auto mr-[20px]">
              <img
                src="/icon_home.svg"
                alt="logo"
                className="w-full h-full object-cover w-[197px] h-[156px]"
              />
            </div>
          </div>
          <div className="flex justify-between py-4">
            <Typography as={"h1"} className="text-2xl font-semibold ">
              Home Devices
            </Typography>
            <div className="flex space-x-4">
              <div className="flex space-x-1 items-center">
                <img
                  src="/humid.svg"
                  alt="icon"
                  className="w-full h-full w-[24px] h-[24px]"
                />
                <Typography as={"p"} className="text-body font-semibold">
                  78%
                </Typography>
              </div>
              <div className="flex space-x-1 items-center">
                <img
                  src="/degree.svg"
                  alt="icon"
                  className="w-full h-full w-[24px] h-[24px]"
                />
                <Typography as={"p"} className="text-body font-semibold">
                  25&deg;C
                </Typography>
              </div>
              <div className="">
                <Select
                  label="Room"
                  className="bg-white shadow-md"
                  value={room}
                  onChange={(value?: string) => setRoom(value || "")}
                >
                  <Option value="2">Bedroom</Option>
                  <Option value="1">Living room</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="py-2 grid grid-cols-2 gap-8 place-content-between">
            {devices
              .filter((device) => device.room_id == room)
              .map((device, index) => (
                <Device
                  status={device.status}
                  index={index}
                  key={device.id}
                  activeIcon={getIconUrl(device.type)}
                  inactiveIcon={getIconInactiveUrl(device.type)}
                  name={device.name}
                  value={device.value}
                  type={device.type}
                  password={device.password}
                  handleChangeValue={(value) =>
                    updateDeviceValue(device.id, value)
                  }
                  handleChangeStatus={(status) =>
                    updateDeviceStatus(device.id, status)
                  }
                  handleChangePassword={(password) =>
                    updateDevicePassword(device.id, password)
                  }
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
