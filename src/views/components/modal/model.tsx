import { useState } from "react";

import {
  Button,
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

const Modalpopup = () => {
  const params = useParams();
  const [open, openchange] = useState(false);
  const [formInfo, setFormInfo] = useState({
    costumerName: "",
    feedback: "",
  });

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
      return
    }

    feedbackService.createFeedback(payload).then((res: any) => {
      if (res.data && res.data.statusCode === 200) {
        toast.success("Feedback submitted")
        openchange(false);
        return;
      }
      toast.error("something went wrong")
       openchange(false);
    }); 
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
      <Button onClick={functionopenpopup} color="primary" variant="contained">
        Submit Your Feedback
      </Button>
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

            <Button color="primary" variant="contained" onClick={handleOnClick}>
              Submit
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default Modalpopup;
