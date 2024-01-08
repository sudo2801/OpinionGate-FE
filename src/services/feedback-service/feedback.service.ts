import { endPoints } from "@/constants/api-constant";
import { apiService } from "../base-api";
import { getErrorAndStatusFromErr } from "@/utils/handle-error";
import { convertObjectToParams } from "@/utils/query";

export interface createFeedback {
  customerName: string;
  feedback: string;
  userId: string;
}

export interface userRegistrationPayload {
  userName: string;
  password: string;
  role: string;
  fullName: string;
}

export interface deleteQuery {
  feedbackId: string;
  userId: string;
}

const createFeedback = async (payload: createFeedback) => {
  const endPoint = `${endPoints.API_V1}${endPoints.feedback.CREATE_FEEDBACK}`;

  const response = await apiService
    .post({ url: endPoint, data: payload })
    .catch((err: any) => getErrorAndStatusFromErr(err));
  return response;
};

const getFeedback = async (userId: string) => {
  const endPoint = `${endPoints.API_V1}${
    endPoints.feedback.GET_FEEDBACK
  }/${userId.trim()}`;

  const response = await apiService
    .get({ url: endPoint })
    .catch((err: any) => getErrorAndStatusFromErr(err));
  return response;
};

const deleteFeedback = async (query: deleteQuery) => {
  const endPoint = `${endPoints.API_V1}${
    endPoints.feedback.DELETE_FEEDBACK
  }${convertObjectToParams(query)}`;

  const response = await apiService
    .delete({ url: endPoint })
    .catch((err: any) => getErrorAndStatusFromErr(err));
  return response;
};

export default { createFeedback, getFeedback, deleteFeedback };
