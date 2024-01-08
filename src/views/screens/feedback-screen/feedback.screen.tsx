import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { withLayout } from "@/views/hoc/with-layout";

import Modalpopup from "@/views/components/modal/model";

import FeedbackContainer from "@/views/components/feedback-container/feedback-container";
import feedbackService from "@/services/feedback-service/feedback.service";

interface LoginInfoType {
  userName: string;
  password: string;
}
interface LoginScreenPropType {}

export const FeedbackScreen: FC<LoginScreenPropType> = withLayout(() => {
  const params = useParams();

  const [allFeedback,setAllFeedback] = useState([])

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    const  userId :string= params?.userID || ""
    
    feedbackService.getFeedback(userId).then((res: any) => {
      if (res.data) {
        const { data } = res.data || [];
        setAllFeedback(data)
      }
    });
  };


  return (
    <>
      <div className="flex flex-col justify-center m-5 gap-3">
        <Modalpopup />
        <FeedbackContainer
          allFeedback={allFeedback}
          getFeedback={getFeedback}
        />
      </div>
    </>
  );
});
