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

  const [loading, setLoading] = React.useState<boolean>(false);

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

  const handleChangeStatus = async (id: string, status: "ON" | "OFF") => {
    setLoading(true);
    await updateDeviceStatus(id, status);
    setLoading(false);
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
            <div className="flex space-x-4 w-[380px]">
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
              <div>
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
                  handleChangeValue={(value: any) =>
                    updateDeviceValue(device.id, value)
                  }
                  handleChangeStatus={(status) =>
                    handleChangeStatus(device.id, status)
                  }
                  handleChangePassword={(password) =>
                    updateDevicePassword(device.id, password)
                  }
                />
              ))}
          </div>
        </div>
        {loading && (
          <div className="fixed top-0 bottom-0 left-0 right-0 items-center z-[90] bg-black opacity-[0.8]">
            <div className="grid h-screen place-items-center z-[25] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] lg:w-full w-[80%]">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="sr-only">Uploading...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
