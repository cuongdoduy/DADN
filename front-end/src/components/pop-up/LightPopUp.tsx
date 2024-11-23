import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

export function LightModal({
  value,
  listColors,
  handleChangeLightColor,
}: {
  value: string;
  listColors: string[];
  handleChangeLightColor: (color: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [colorChoose, setColorChoose] = React.useState(value);

  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    handleChangeLightColor(colorChoose);
    handleOpen();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpen} className="max-h-[40px]">
        Change Light Color
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
              <img
                src="/lamp.svg"
                alt="brightness"
                className="w-full max-w-[160px] mx-auto"
              />
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
              {listColors.map((color) => (
                <div
                  key={color}
                  className={`w-[28px] h-[28px] border-[4px] rounded-full cursor-pointer hover:shadow-md ${
                    color === colorChoose ? "shadow-md" : ""
                  }`}
                  style={{
                    borderColor: color,
                    backgroundColor:
                      color === colorChoose ? color : "transparent",
                  }}
                  onClick={() => setColorChoose(color)}
                ></div>
              ))}

              {/* <div
                className={`w-[28px] h-[28px] border-[4px] border-red-500 rounded-full cursor-pointer hover:shadow-md ${
                  color === "red-500" ? "bg-red-500" : ""
                }`}
                onClick={() => setColor("red-500")}
              ></div>
              <div
                className={`w-[28px] h-[28px] border-[4px] border-blue-500 rounded-full cursor-pointer hover:shadow-md ${
                  color === "blue-500" ? "bg-blue-500" : ""
                }`}
                onClick={() => setColor("blue-500")}
              ></div>
              <div
                className={`w-[28px] h-[28px] border-[4px] border-green-500 rounded-full cursor-pointer hover:shadow-md ${
                  color === "green-500" ? "bg-green-500" : ""
                }`}
                onClick={() => setColor("green-500")}
              ></div>
              <div
                className={`w-[28px] h-[28px] border-[4px] border-yellow-500 rounded-full cursor-pointer hover:shadow-md ${
                  color === "yellow-500" ? "bg-yellow-500" : ""
                }`}
                onClick={() => setColor("yellow-500")}
              ></div>
              <div
                className={`w-[28px] h-[28px] border-[4px] border-purple-500 rounded-full cursor-pointer hover:shadow-md ${
                  color === "purple-500" ? "bg-purple-500" : ""
                }`}
                onClick={() => setColor("purple-500")}
              ></div>
              <div
                className={`w-[28px] h-[28px] border-[4px] border-indigo-500 rounded-full cursor-pointer hover:shadow-md ${
                  color === "indigo-500" ? "bg-indigo-500" : ""
                }`}
                onClick={() => setColor("indigo-500")}
              ></div>
              <div
                className={`w-[28px] h-[28px] border-[4px] border-pink-500 rounded-full cursor-pointer hover:shadow-md ${
                  color === "pink-500" ? "bg-pink-500" : ""
                } `}
                onClick={() => setColor("pink-500")}
              ></div> */}
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
