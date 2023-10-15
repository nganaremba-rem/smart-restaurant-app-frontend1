import React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

function RateMenu({ item }) {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Typography key={item.menuName._id} marginRight="10px">
        {item.menuName.name}
        <Rating
          name="no-value"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Typography>
      <Button>done</Button>
    </div>
  );
}

export default RateMenu;
