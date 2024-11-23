export interface IDeviceProps {
  index: number;
  activeIcon?: string | React.ReactNode;
  inactiveIcon?: string | React.ReactNode;
  type: "base" | "relay" | "fan" | "light" | "door";
  name: string;
  value: any;
  status: "ON" | "OFF" | "";
  handleChangeValue: (value: string | number | boolean | null) => void;
  handleChangeStatus: (value: "ON" | "OFF") => void;
  handleChangePassword: (password: string) => void;
  password?: string;
}
