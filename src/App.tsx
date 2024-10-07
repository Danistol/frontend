import { useEffect, useState } from "react";
import "./App.css";
import Cats from "./components/Cats";
import SubmitCats from "./components/SubmitCats";

function App() {
  return (
    <>
      <Cats />
      <SubmitCats />
    </>
  );
}

export default App;
