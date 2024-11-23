import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import WheelPicker from "./WheelPicker";

export function FanModal({
  value,
  handleChangeFanSpeed,
}: {
  value: string;
  handleChangeFanSpeed: (speed: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(parseInt(value, 10));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt(e.target.value, 10));
  };

  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    handleChangeFanSpeed(selectedValue.toString());
    handleOpen();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpen} className="max-h-[40px]">
        Change Fan Speed
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogBody className="min-h-[90vh] grid grid-cols-12 gap-x-8 !p-0">
          <div className="h-full col-span-5 bg-gray-200">
            <div className="w-full px-2 py-2 bg-white flex items-center space-x-4">
              <img src="/color.svg" alt="color" className="w-[48px] h-[48px]" />
              <Typography
                as="h5"
                variant="h5"
                className="text-h5 text-[black] font-semibold !p-0"
              >
                Color
              </Typography>
            </div>
          </div>
          <div className="h-full col-span-7">
            <div className="w-full px-2 py-2">
              {/* <img
                src="/lamp.svg"
                alt="brightness"
                className="w-full max-w-[160px] mx-auto"
              /> */}
            </div>
            {/* List of colors to select */}
            <div className="w-full grid grid-cols-4 gap-4 px-2 py-2 pb-2 my-[20px]">
              <div className="col-span-4">
                <Typography
                  as="h6"
                  variant="h6"
                  className="text-h6 text-[black] font-semibold !p-0"
                >
                  Color
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph"
                  className="text-footnote text-gray-600 !p-0"
                >
                  Pick available color
                </Typography>
                <hr className="w-full border-[1px] border-gray-200 my-2" />
              </div>
              <div className="col-span-4">
                <WheelPicker selectedValue={selectedValue} handleChange={handleChange} />
              </div>
            </div>
            <div className="w-full flex justify-center space-x-4">
              <Button
                onClick={handleOpen}
                className="border-[1px] border-gray-600 bg-transparent text-[#202020]"
              >
                Cancel
              </Button>
              <Button color="blue" onClick={handleSave}>
                Save Setting
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
