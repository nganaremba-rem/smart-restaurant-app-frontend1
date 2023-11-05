import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Axios from "axios";
import Config from "../config/Config";
import { useNavigate } from "react-router-dom";
export default function RateOrderDialog({ order }) {
  const [open, setOpen] = React.useState(false);
  const [hashMap, setHashMap] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleSubmitFeedBack = async () => {
    const token = JSON.parse(localStorage.getItem("SRA_userData")).token;

    for (const _id of Object.keys(hashMap)) {
      let rating = hashMap[_id];
      try {
        await Axios.post(
          `${Config.API_BASE_URL}menuItems/rating/${_id}`,
          { rating: rating },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await Axios.patch(
        `${Config.API_BASE_URL}orders/${order._id}`,
        {
          isRated: true,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{ borderColor: "#ff841c", color: "#ff841c" }}
        onClick={handleClickOpen}
      >
        RATE ORDER{" "}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>RATE YOUR MEAL</DialogTitle>
        <DialogContent>
          <Box>
            {order.menuItems.map((item) => (
              <Typography key={item.menuName._id} marginRight="10px">
                {item.menuName.name}
                <Rating
                  onChange={(event, newValue) => {
                    setHashMap((prevHashMap) => ({
                      ...prevHashMap,
                      [item.menuName._id]: newValue,
                    }));
                  }}
                ></Rating>
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitFeedBack}
            variant="contained"
            style={{ backgroundColor: "#ff841c", color: "#ffffff" }}
          >
            Submit Your Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
