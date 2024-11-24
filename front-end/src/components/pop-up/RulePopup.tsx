import React, { useContext } from "react";
import {
  Button,
  Collapse,
  Dialog,
  DialogBody,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PlusCircleIcon,
} from "@heroicons/react/16/solid";
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

export function RuleModal() {
  const [open, setOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(true);
  const { devices } = useContext(DeviceContext) || {
    devices: [],
  };
  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    // Send scenarioDevices to the backend

    const body = {
      command_id: "CMD00020",
      command_name: "CONTROL_RULE",
      type: "ADD",
      value: {
        device_type_if: "TEMP",	// device type
        node_id_if: "CentralNode",
        comparator_if: condition,
        value_if: temperature,
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
      },
    };

    const res = await axios.post("http://localhost:5000/api/scenarios", body);

    console.log(res.data);
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

  const [condition, setCondition] = React.useState<string>("=");
  const [temperature, setTemperature] = React.useState<number>(10);

  console.log("condition", condition);

  return (
    <>
      <Button
        color="blue"
        className="flex items-center !rounded-[6px] !py-2"
        onClick={handleOpen}
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Add Rule
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogBody className="min-h-[90vh] grid grid-cols-12 gap-x-8 !p-0">
          <div className="h-full col-span-4 bg-gray-200">
            <div className="w-full px-2 py-2 bg-white flex items-center space-x-4">
              <img src="/sun.svg" alt="sun" className="h-8 w-8" />
              <Typography
                as="h6"
                variant="h6"
                className="text-h6 text-[black] font-semibold !p-0"
              >
                Add new rule when temperature changes
              </Typography>
            </div>
          </div>
          <div className="h-full col-span-8 mr-[20px] mt-[20px]">
            <div className="w-full px-2 py-2 flex justify-between">
              <Typography
                as="h6"
                variant="h6"
                className="text-h6 text-[black] font-semibold !p-0"
              >
                Temperature
              </Typography>
              <IconButton
                className="bg-white"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                {openDropdown ? (
                  <ChevronDoubleDownIcon className="h-6 w-6 text-black" />
                ) : (
                  <ChevronDoubleUpIcon className="h-6 w-6 text-black" />
                )}
              </IconButton>
            </div>
            <div className="full px-2 py-2">
              {" "}
              {openDropdown && (
                <Collapse open={openDropdown}>
                  <div className="w-full bg-[#F3F4F4] min-h-[300px] h-auto rounded-[8px] px-8 py-6">
                    <div className="">
                      <Typography
                        as="h6"
                        variant="h6"
                        className="text-h6 text-[black] font-semibold !p-0"
                      >
                        If
                      </Typography>
                      <Typography
                        as="p"
                        variant="paragraph"
                        className="text-footnote text-gray-600 !p-0 mb-4"
                      >
                        when the condition is met
                      </Typography>
                    </div>
                    <div className="grid grid-cols-1 gap-y-4">
                      <Select
                        label="Choose condition"
                        value={condition}
                        onChange={(value) => setCondition(value || "")}
                      >
                        <Option value=">">&gt;</Option>
                        <Option value="<">&lt;</Option>
                        <Option value="=">=</Option>
                        <Option value=">=">&gt;=</Option>
                        <Option value="<=">&lt;=</Option>
                      </Select>
                      <Input
                        type="number"
                        label="Temperature"
                        value={temperature}
                        min={10}
                        max={50}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        onBlur={(e) =>
                          setTemperature(
                            Number(e.target.value) < 10
                              ? 10
                              : Number(e.target.value) > 50
                              ? 50
                              : Number(e.target.value)
                          )
                        }
                      />
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
                        <Option value="1">Living Room</Option>
                        <Option value="2">Bed Room</Option>
                      </Select>
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
                            (deviceOption) =>
                              deviceOption.room_id == device.room_id
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
                      {device.id && (
                        <DeviceValueOption
                          device={device}
                          handleChangeValue={handleChangeValue}
                        />
                      )}
                    </div>
                  </div>
                </Collapse>
              )}
            </div>
            <div className="w-full flex justify-center space-x-4 mt-[20px]">
              <Button
                color="blue"
                onClick={handleSubmit}
                disabled={device.id === "" || device.value === ""}
              >
                Add rule
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
