import { FC, useState } from "react";

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
import feedbackService from "@/services/feedback-service/feedback.service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalPopup {
  getFeedback: Function;
}
const initialState = {
  costumerName: "",
  feedback: "",
};
const Modalpopup: FC<ModalPopup> = ({ getFeedback }) => {
  const params = useParams();

  const [open, openchange] = useState(false);
  const [formInfo, setFormInfo] = useState(initialState);

  const handleOnChange = (e: any) => {
    const { value, name } = e.target || {};
    if (name === "costumerName") {
      setFormInfo({ ...formInfo, costumerName: value });
    } else {
      setFormInfo({ ...formInfo, feedback: value });
    }
  };

  const handleOnClick = () => {
    const payload: any = {
      customerName: formInfo.costumerName,
      feedback: formInfo.feedback,
      userId: params?.userID,
    };

    const isValid = Object.values(payload).every(
      (value) => value !== undefined && value !== ""
    );
    if (!isValid) {
      toast.error("All filed required");
      return;
    }

    feedbackService.createFeedback(payload).then((res: any) => {
      if (res.data && res.data.statusCode === 200) {
        toast.success("Feedback submitted..!");
        openchange(false);
        getFeedback();
        return;
      }
      toast.error("something went wrong");
      openchange(false);
    });
    setFormInfo(initialState);
  };

  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>MUI - DIALOG</h1>
      <button
        onClick={functionopenpopup}
        type="button"
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Submit Your Feedback
      </button>
      <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Feedback form{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              onChange={handleOnChange}
              variant="outlined"
              label="Customer name"
              value={formInfo.costumerName}
              name="costumerName"
            ></TextField>
            <TextField
              id="filled-textarea"
              label="Enter your feedback"
              placeholder="Placeholder"
              multiline
              variant="filled"
              value={formInfo.feedback}
              name="feedback"
              onChange={handleOnChange}
            />

            <button
              onClick={handleOnClick}
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

export default Modalpopup;
