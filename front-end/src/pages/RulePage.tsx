import { Typography } from "@material-tailwind/react";
import NavbarCustom from "../components/Header";
import { RuleModal } from "../components/pop-up/RulePopup";

const RulePage = () => {
  return (
    <main>
      <NavbarCustom />
      <main className="bg-[#F3F4F4] min-h-[100vh]">
        <div className="w-[80%] mx-auto py-[20px] flex justify-between">
          <Typography as="h1" className="text-2xl font-semibold text-gray-800">
            Rules
          </Typography>
          <RuleModal />
        </div>
      </main>
    </main>
  );
};

export default RulePage;
