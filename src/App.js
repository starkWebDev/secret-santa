import React from "react";
import "./App.css";
import { MyProvider } from "./MyContext";
// import { Typography } from "@material-ui/core";
import { AppBarHeader } from "./Components/AppBarHeader";
import { MainContainer } from "./Components/MainContainer";

function App() {
  return (
    <MyProvider>
      <>
        <AppBarHeader />
        <MainContainer />
      </>
    </MyProvider>
  );
}

export default App;
