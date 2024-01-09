import feedbackService from "@/services/feedback-service/feedback.service";
import { TrashIcon } from "@heroicons/react/20/solid";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FeedbackContainerProps {
  allFeedback: Array<{
    customerName: string;
    _id: string;
    feedback: string;
  }>;
  getFeedback: Function;
}

const FeedbackContainer: FC<FeedbackContainerProps> = ({
  allFeedback,
  getFeedback,
}) => {
  const params = useParams();
  const [open, openchange] = useState(false);

  const [formInfo, setFormInfo] = useState("");
  const [feedbackId, setFeedbackId] = useState("");

  const handleOnChange = (e: any) => {
    const { value } = e.target || {};
    setFormInfo(value);
  };

  const handleUpdateFeedback = () => {
    const payload = {
      feedback: formInfo,
      feedbackId: feedbackId,
      userId: params?.userID,
    };

    feedbackService.UpdateFeedback(payload).then((res: any) => {
      console.log(res);
      if (res.data && res.data.statusCode === 202) {
        console.log(res);
        toast.success("Feedback Updated..!");
        openchange(false);
        getFeedback();
        return;
      }
      toast.error("something went wrong. Please Try Again!");
      openchange(false);
      setFormInfo("");
      closepopup();
    });
  };

  const onClickUpdate = (feedbackId: string, value: string) => {
    setFormInfo(value);
    setFeedbackId(feedbackId);
    functionopenpopup();
  };

  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);
  };

  const handleOnClick = (_id: string) => {
    const queryParm: any = {
      feedbackId: _id,
      userId: params?.userID,
    };
    feedbackService.deleteFeedback(queryParm).then((res: any) => {
      if (res.data.statusCode === 202) {
        toast.success("feedback delete successfully");
        getFeedback();
        return;
      } else {
        toast.success("Smothering went wrong");
      }
    });
  };

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {allFeedback.map(({ customerName, _id, feedback }) => (
          <li
            key={_id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center  transition duration-300 ease-in-out hover:scale-110"
          >
            <div className="flex flex-1 flex-col p-1 ">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Customer Name 🔸 {customerName}
              </h3>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-900">
                _Feedback_
              </span>
              <h3 className="text-ls font-medium text-gray-900 overflow-hidden  m-1 p-1">
                {feedback}
              </h3>
            </div>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1 bg-blue-500 ">
                  <button
                    onClick={() => onClickUpdate(_id, feedback)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    Update feedback
                  </button>
                </div>

                <div className="-ml-px flex w-0 flex-1 bg-blue-400">
                  <button
                    onClick={() => handleOnClick(_id)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <TrashIcon
                      className="h-5 w-5 text-black-400"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Update Feedback{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              id="filled-textarea"
              label="Update your feedback"
              placeholder="type here"
              multiline
              variant="filled"
              value={formInfo}
              name="feedback"
              onChange={handleOnChange}
            />

            <button
              onClick={handleUpdateFeedback}
              type="button"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Submit
            </button>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackContainer;
