import { endPoints } from "@/constants/api-constant";
import { apiService } from "../base-api";
import { getErrorAndStatusFromErr } from "@/utils/handle-error";

export interface userLoginPayload {
  userName: string;
  password: string;
}

export interface userRegistrationPayload {
  userName: string;
  password: string;
  role: string;
  fullName: string;
}

const userLogin = async (payload: userLoginPayload) => {
  const endPoint = `${endPoints.API_V1}${endPoints.user.LOGIN}`;

  const response = await apiService
    .post({ url: endPoint, data: payload })
    .catch((err: any) => getErrorAndStatusFromErr(err));
  return response;
};

const userRegistration = async (payload: userRegistrationPayload) => {
  const endPoint = `${endPoints.API_V1}${endPoints.user.REGISTRATION}`;

  const response = await apiService
    .post({ url: endPoint, data: payload })
    .catch((err: any) => getErrorAndStatusFromErr(err));
  return response;
};

const userLogout = async () => {
  const endPoint = `${endPoints.API_V1}${endPoints.user.LOGIN}`;

  const response = await apiService
    .get({ url: endPoint })
    .catch((err: any) => getErrorAndStatusFromErr(err));
  return response;
};

export default { userLogin, userRegistration, userLogout };
