import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "@/services/auth-service/auth-service";
import { toast } from "react-toastify";
import { dispatch } from "@/state/store";
import authThunk from "@/state/ducks/auth/thunks";
import { withLayout } from "@/views/hoc/with-layout";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Modalpopup from "@/views/components/modal/model";
import { CToast } from "@/views/components/shared/toast";
import FeedbackContainer from "@/views/components/feedback-container/feedback-container";


interface LoginInfoType {
  userName: string;
  password: string;
}
interface LoginScreenPropType {}

export const FeedbackScreen: FC<LoginScreenPropType> = withLayout(() => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    userName: "",
    password: "",
  });

  const handleOnChange = (e: any) => {
    const { value, name } = e.target || {};
    if (name === "username") {
      setLoginInfo({ ...loginInfo, userName: value });
    } else {
      setLoginInfo({ ...loginInfo, password: value });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    authService.userLogin({ ...loginInfo }).then((res: any) => {
      if (res.data) {
        const { accessToken, refreshToken } = res.data.data || {};
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(authThunk.setLoginThunk(true))
      }
    });
  };

  const handleOnClickRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex flex-col justify-center m-5 gap-3">
        <Modalpopup />
        <FeedbackContainer />
      </div>
    </>
  );
});
