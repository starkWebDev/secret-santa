import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const AppBarHeader = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography>Secret Santa</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
