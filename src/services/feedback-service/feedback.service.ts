import { endPoints } from "@/constants/api-constant";
import { apiService } from "../base-api";
import { getErrorAndStatusFromErr } from "@/utils/handle-error";

export interface createFeedback {
  customerName: string;
    feedback: string;
    userId:string
}

export interface userRegistrationPayload {
  userName: string;
  password: string;
  role: string;
  fullName: string;
}

const createFeedback = async (payload: createFeedback) => {
  const endPoint = `${endPoints.API_V1}${endPoints.feedback.CREATE_FEEDBACK}`;

  const response = await apiService
    .post({ url: endPoint, data: payload })
    .catch((err: any) => getErrorAndStatusFromErr(err));
  return response;
};





export default { createFeedback };
