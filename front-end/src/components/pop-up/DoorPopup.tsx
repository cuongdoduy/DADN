import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import PasswordChange from "./PasswordChange";

export function DoorModal({
  password,
  handleChangeDoorPassword,
}: {
  password: string;
  handleChangeDoorPassword: (password: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSave = (newPassword:string) => {
    handleChangeDoorPassword(newPassword);
    handleOpen();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpen} className="max-h-[40px]">
        Change Door Password
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogBody className="min-h-[90vh] grid grid-cols-12 gap-x-8 !p-0">
          <div className="h-full col-span-5 bg-gray-200">
            <div className="w-full px-2 py-2 bg-white flex items-center space-x-4">
              <Typography
                as="h5"
                variant="h5"
                className="text-h5 text-[black] font-semibold !p-0"
              >
                Password
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
                  Password
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph"
                  className="text-footnote text-gray-600 !p-0"
                >
                  Change your door password
                </Typography>
                <hr className="w-full border-[1px] border-gray-200 my-2" />
              </div>
              <div className="col-span-4">
                <PasswordChange handleSave={handleSave} oldPassword={password}/>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
