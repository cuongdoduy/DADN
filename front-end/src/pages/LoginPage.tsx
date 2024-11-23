import { Button, Typography } from "@material-tailwind/react";
import { useGoogleLogin } from "@react-oauth/google";
import {
  getRefreshAndAccessToken,
  refreshTokenSetup,
} from "../utils/refreshToken";
import { useAuth } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    // adding scope to get full authority to get information
    // to get the refresh token we need to request for authentication code.
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      // set access token to the cookie expire in 1 hour with secure and httpOnly

      console.log("Login Success:", codeResponse);

      const { access_token, refresh_token } = await getRefreshAndAccessToken(
        codeResponse
      );

      Cookies.set("access_token", access_token, {
        expires: 1 / 24,
      });

      Cookies.set("refresh_token", refresh_token, {
        expires: 6,
      });

      refreshTokenSetup();

      handleLogin();

      navigate("/");
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });
  return (
    <>
      <main className="w-[90vw] mx-auto relative">
        <div className="absolute -top-[60px] left-[50%] translate-x-[-50%]">
          <img src="/bg_login.svg" alt="logo" className="w-[595px]" />
        </div>
        <div className="pt-[20px]">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <img src="/icon.svg" alt="logo" className="w-[223px] h-[41px]" />
          </Typography>
        </div>
        <div className="w-full grid grid-cols-2 relative overflow-hidden">
          <div className="justify-self-center my-auto">
            <Button
              onClick={() => googleLogin()}
              className="bg-primary text-white w-fit"
            >
              Sign in with Google{" "}
            </Button>
          </div>
          <div className="w-full max-w-full justify-self-center">
            <img
              src="/bg_login_2.svg"
              alt="logo"
              className="w-[646px] h-[646px]"
            />
          </div>
        </div>
      </main>
      <div className="fixed bottom-[-240px] right-[-240px] rotate-90">
        <img src="/bg_login.svg" alt="logo" className="w-full" />
      </div>
    </>
  );
};

export default LoginPage;
