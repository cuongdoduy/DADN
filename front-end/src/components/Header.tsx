import React, { useRef } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { googleLogout } from "@react-oauth/google";
import { getAccessToken, refreshTokenSetup } from "../utils/refreshToken";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfileMenu from "./ProfileMenu";

const NavbarCustom = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { handleLogout } = useAuth();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  const initialUserProperties = {
    access_token: "",
    expires_in: 0,
    id_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
  };

  const emailUserProfile = {
    email: "",
    family_name: "",
    given_name: "",
    hd: "",
    id: "",
    locale: "",
    name: "",
    picture: "",
    verified_email: false,
  };

  const [emailUser, setEmailUser] = React.useState(initialUserProperties);
  const [emailProfile, setEmailProfile] = React.useState<null | {
    email: string;
    family_name: string;
    given_name: string;
    hd: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
    verified_email: boolean;
  }>(emailUserProfile);
  const [search, setSearch] = React.useState("");

  const hasRefreshSetupRun = useRef(false);

  const logOut = () => {
    googleLogout();
    setEmailProfile(null);
    setEmailUser(initialUserProperties);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    handleLogout();
    navigate("/login");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    if (emailUser.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${emailUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${emailUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setEmailProfile(res.data);
        })
        .catch((err) => console.log("err: ", err));
    }
  }, [emailUser]);

  React.useEffect(() => {
    const fetchAccessToken = async () => {
      if (!hasRefreshSetupRun.current) {
        refreshTokenSetup();
        hasRefreshSetupRun.current = true; // Ensure this only runs once
      }
      if (Cookies.get("access_token")) {
        setEmailUser((prev) => ({
          ...prev,
          access_token: Cookies.get("access_token") || "",
        }));
      } else {
        const accessToken = await getAccessToken();
        if (accessToken === null) {
          return logOut();
        } else {
          Cookies.set("access_token", accessToken, {
            expires: 1 / 24,
          });
          setEmailUser((prev) => ({
            ...prev,
            access_token: accessToken,
          }));
        }
      }
    };
    fetchAccessToken();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 h-max !max-w-full w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center justify-start gap-x-2 flex-1">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              <img src="/icon.svg" alt="logo" className="w-[223px] h-[41px]" />
            </Typography>
            <form
              className="flex items-center w-[500px] group bg-[#f1f1f1] rounded-lg"
              onSubmit={handleSubmit}
            >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400 group-focus-within:text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="simple-search"
                  className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
          {emailProfile && (
            <ProfileMenu avatar={emailProfile?.picture} handleLogout={logOut} />
          )}
          <div className="flex items-center gap-4">
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarCustom;
