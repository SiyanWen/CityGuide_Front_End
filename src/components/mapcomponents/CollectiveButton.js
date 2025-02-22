import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../../MyMuiTheme";

const CollectiveButton = () => {
  const [collect, setCollect] = useState(false);
  const handleClick = () => {
    setCollect(!collect);
  };

  //axios.post

  return (
    <ThemeProvider theme={myTheme}>
      <Button
        variant="contained"
        color="secondary"
        onClick={()=>{handleClick()}}
        size="large"
        style={{ transform: "scale(0.95)" }}
      >
        {collect ? (
          <StarIcon fontSize="small" color="yellow" />
        ) : (
          <StarBorderIcon fontSize="small" color="white" />
        )}
      </Button>
    </ThemeProvider>
  );
};

export default CollectiveButton;
