import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { DeviceContext } from "../../contexts/DeviceContext";
import AsyncSelect from "./AsyncSelect";
import axios from "axios";

interface ScenarioDevice {
  id: string;
  status: "ON" | "OFF";
  value: any;
  room_id: string;
  type: "base" | "relay" | "fan" | "light" | "door";
}

function DeviceValueOption({
  device,
  handleChangeValue,
}: {
  device: ScenarioDevice;
  handleChangeValue: (value: any) => void;
}) {
  switch (device.type) {
    case "light":
      return (
        <Select
          value={device.value}
          label="Choose light value"
          onChange={handleChangeValue}
        >
          {/* List of colors to select */}
          <Option value="FFFFFF">White</Option>
          <Option value="FF0000">Red</Option>
          <Option value="00FF00">Green</Option>
        </Select>
      );
    case "fan":
      return (
        <input
          type="range"
          min="0"
          value={device.value}
          onChange={(e) => handleChangeValue(e.target.value)}
          max="100"
          className="w-full appearance-none h-2 bg-gray-300 rounded-full outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-400"
        />
      );
    case "relay":
      return (
        <Select
          value={device.value}
          label="Choose action"
          onChange={handleChangeValue}
        >
          <Option value="1">ON</Option>
          <Option value="0">OFF</Option>
        </Select>
      );
    case "door":
      return (
        <Select
          value={device.value}
          label="Choose action"
          onChange={handleChangeValue}
        >
          <Option value="1">Open</Option>
          <Option value="0">Close</Option>
        </Select>
      );
    default:
      return <Option value="">Select Device</Option>;
  }
}

export function ScenarioModal() {
  const [open, setOpen] = React.useState(false);
  const { devices } = useContext(DeviceContext) || {
    devices: [],
  };
  const [scenarioDevices, setScenarioDevices] = React.useState<
    Array<ScenarioDevice>
  >([]);
  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    setScenarioDevices([...scenarioDevices, device]);
    setDevice({
      id: "",
      status: "ON",
      value: "",
      room_id: "",
      type: "base",
    });
  };

  const handleSubmit = async () => {
    // Send scenarioDevices to the backend

    const body = {
      command_id: "CMD00030",
      command_name: "SCENARIO",
      type: "ADD",
      value: scenarioDevices.map((device) => ({
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
      })),
    };

    const res = await axios.post("http://localhost:5000/api/scenarios", body);

    console.log(res.data);

    console.log(scenarioDevices);
    setScenarioDevices([]);
    setDevice({
      id: "",
      status: "ON",
      value: "",
      room_id: "",
      type: "base",
    });
    handleOpen();
  };

  const [device, setDevice] = React.useState<ScenarioDevice>({
    id: "",
    status: "ON",
    value: "",
    room_id: "",
    type: "base",
  });

  console.log("device", device);

  const handleChangeValue = (value: any) => {
    setDevice({
      ...device,
      value: value,
    });
  };

  const getValueName = (type: string, value: string) => {
    switch (type) {
      case "light":
        switch (value) {
          case "FFFFFF":
            return "White";
          case "FF0000":
            return "Red";
          case "00FF00":
            return "Green";
          default:
            return "Unknown";
        }
      case "fan":
        return `${value}`;
      case "relay":
        return value === "1" ? "ON" : "OFF";
      case "door":
        return value === "1" ? "Open" : "Close";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Button
        color="blue"
        className="flex items-center !rounded-[6px] !py-2"
        onClick={handleOpen}
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Add Scenario
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogBody className="min-h-[90vh] grid grid-cols-12 gap-x-8 !p-0">
          <div className="h-full col-span-4 bg-gray-200">
            <div className="w-full px-2 py-2 bg-white flex items-center space-x-4">
              <Typography
                as="h5"
                variant="h5"
                className="text-h5 text-[black] font-semibold !p-0"
              >
                Add new scenario
              </Typography>
            </div>
          </div>
          <div className="h-full col-span-7 mt-[20px]">
            <div className="w-full px-2 py-2">
              <Select
                value={device.room_id}
                onChange={(value) => {
                  setDevice({
                    ...device,
                    id: "",
                    room_id: value || "",
                  });
                }}
                label="Room"
              >
                <Option value="">Select Room</Option>
                <Option value="1">Room 1</Option>
                <Option value="2">Room 2</Option>
              </Select>
              {/* Select device from room 1 */}
            </div>
            <div className="w-full px-2 py-2">
              <AsyncSelect
                value={device.id}
                onChange={(value) => {
                  const deviceSelect = devices.find(
                    (device) => device.id == value
                  );
                  setDevice({
                    ...device,
                    id: value?.toString() || "",
                    type: deviceSelect?.type || "base",
                    value: deviceSelect?.value || "",
                  });
                }}
                label="Device"
              >
                {devices
                  .filter(
                    (deviceOption) => deviceOption.room_id == device.room_id
                  )
                  // add "select device" option
                  .concat({
                    id: "",
                    name: "Select Device",
                    room_id: "",
                    type: "base",
                    status: "OFF",
                    value: "",
                  })
                  .map((device, index) => (
                    <Option key={index} value={device.id}>
                      {device.name}
                    </Option>
                  ))}
              </AsyncSelect>
            </div>
            {device.id && (
              <div className="w-full px-2 py-2  ">
                <DeviceValueOption
                  device={device}
                  handleChangeValue={handleChangeValue}
                />
              </div>
            )}
            <div className="w-full flex justify-center space-x-4 mt-[20px]">
              <Button
                color="blue"
                onClick={handleSave}
                disabled={device.id === "" || device.value === ""}
              >
                Add Device
              </Button>
            </div>

            <div className="w-full px-2 py-2">
              <Typography
                as="h6"
                variant="h6"
                className="text-h6 text-[black] font-semibold !p-0"
              >
                Scenario Devices
              </Typography>
              <Typography
                as="p"
                variant="paragraph"
                className="text-footnote text-gray-600 !p-0"
              >
                List of devices in this scenario
              </Typography>
              <hr className="w-full border-[1px] border-gray-200 my-2" />
              <div className="grid grid-cols-3 gap-x-4">
                <Typography
                  as="h6"
                  variant="h6"
                  className="text-h6 text-[black] font-semibold !p-0"
                >
                  Device
                </Typography>
                <Typography
                  as="h6"
                  variant="h6"
                  className="text-h6 text-[black] font-semibold !p-0 text-center"
                >
                  Value
                </Typography>
                <Typography
                  as="h6"
                  variant="h6"
                  className="text-h6 text-[black] font-semibold !p-0 text-center"
                >
                  Action
                </Typography>
              </div>
              {scenarioDevices.map((device, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 my-4 items-center"
                >
                  <Typography as="p" variant="paragraph">
                    {devices.find((d) => d.id === device.id)?.name} -{" "}
                    {device.room_id === "1" ? "Living Room" : "Bed Room"}
                  </Typography>
                  <Typography
                    as="p"
                    variant="paragraph"
                    className="text-center"
                  >
                    {getValueName(device.type, device.value)}
                  </Typography>
                  <Button
                    color="red"
                    onClick={() =>
                      setScenarioDevices(
                        scenarioDevices.filter(
                          (scenarioDevice) => scenarioDevice.id !== device.id
                        )
                      )
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center space-x-4 mt-[20px]">
              <Button
                onClick={handleOpen}
                className="border-[1px] border-gray-600 bg-transparent text-[#202020]"
              >
                Cancel
              </Button>
              <Button
                color="blue"
                onClick={handleSubmit}
                disabled={scenarioDevices.length === 0}
              >
                Add Scenario
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
